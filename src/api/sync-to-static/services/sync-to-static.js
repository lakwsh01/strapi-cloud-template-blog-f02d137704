'use strict';
const { S3, ObjectCannedACL } = require('@aws-sdk/client-s3');

// populate:
// http://localhost:1337/api/weekly-keywords/1?populate[image][populate][thumpnail]=&populate[image][populate]=&populate[keyword][populate]=*

const p = {
    populate: {
        keyword: {
            populate: {
                tags: true
            }

        },
    }
}
const s3 = new S3({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_ACCESS_SECRET,
    },
    region: process.env.AWS_REGION
});

const populateSettings = {
    keyword: {
        fields: ['keyword', 'tags']
    },
    category: true,
    headerImage: true,
    thumbnail: true,
    preview: true
}

module.exports = ({ strapi, env }) => ({
    publishToStatic: async (/** @type {Object} */ ctx) => {
        // console.log('strapi::: ', strapi)
        // console.log('env:: ', process.env.CDN_CONTENT_ROOT_PATH)
        const data = await strapi.service('api::sync-to-static.sync-to-static').getObject(ctx);
        const list = await strapi.service('api::sync-to-static.sync-to-static').getList(ctx);
        // console.log('list: ', list)
        if (data.object === null) {
            return;
        }
        const simulateResponse = await strapi.service('api::sync-to-static.sync-to-static').simulateDetailResponse(data.id, data.object, 'detail');
        const simulateListResponse = await strapi.service('api::sync-to-static.sync-to-static').simulateListResponse(list.object);
        // console.log('simulateListResponse datas::: ', simulateListResponse[0].attributes);
        try {
            // const s3 = new AWS.S3({
            //     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            //     secretAccessKey: process.env.AWS_ACCESS_SECRET,
            //     region: process.env.AWS_REGION,
            //     signatureVersion: 'v4'
            // })

            const params = {
                Bucket: process.env.AWS_BUCKET,
                Key: `${process.env.CDN_CONTENT_ROOT_PATH}/detail/${data.api}/${data.id}.json`, // Unique filename
                Body: JSON.stringify(simulateResponse), // File buffer
                ACL: ObjectCannedACL.public_read, // Set file permissions (optional)
            };

            const uploadResult = await s3.putObject(params);
            const uploadListResult = await s3.putObject({ ...params, Key: `${process.env.CDN_CONTENT_ROOT_PATH}/list/${data.api}.json`, Body: JSON.stringify(simulateListResponse) });
            // console.log('uploadResult::: ', uploadResult);
            // console.log('uploadListResult::: ', uploadListResult);

        } catch (error) {
            console.log('error: ', error);
        }
        return;
    },
    unpublishFromStatic: async (/** @type {Object} */ ctx) => {
        const urls = ctx.request.url.split('/');
        const api = urls[3]
        const objectId = urls[4]
        const params = {
            Bucket: process.env.AWS_BUCKET,
            Key: `${process.env.CDN_CONTENT_ROOT_PATH}/${api}/${objectId}.json`, // Unique filename
            ACL: ObjectCannedACL.public_read, // Set file permissions (optional)
        };
        const removeResult = await s3.deleteObject(params);
        // console.log('removeResult::: ', removeResult);

    },
    getObject: async (/** @type {Object} */ ctx) => {
        const urls = ctx.request.url.split('/');
        const api = urls[3]
        const objectId = urls[4]
        return {
            api: api,
            id: objectId,
            object: await strapi.entityService.findOne(api, objectId, { populate: '*' })
        }
    },
    getList: async (/** @type {Object} */ ctx) => {
        const urls = ctx.request.url.split('/');
        const api = urls[3]
        const /** @type {Array<String>} */  previewFields = await strapi.service('api::sync-to-static.sync-to-static').getPreviewFields(ctx);
        // console.log('api::: ', previewFields)
        // GET /api/articles?fields[0]=title&fields[1]=slug&populate[headerImage][fields][0]=name&populate[headerImage][fields][1]=url
        const populateOutput = previewFields.filter(f => Object.keys(populateSettings).includes(f)
        ).reduce((acc, key) => {
            const k = { ...acc }
            k[key] = populateSettings[key]
            return k
        }, {})
        // console.log('getList populateOutput::: ', populateOutput)
        const /** @type {Array<Object>} */ datas = await strapi.entityService.findMany(api, {
            fields: previewFields.filter(f => !Object.keys(populateSettings).includes(f)),
            sort: { createdAt: 'DESC' },
            populate: populateOutput
        })
        datas.forEach(async ele => {
            const thumbnail = await strapi.service('api::formator.formator').getImageUrl(ele.preview, "thumbnail");
            ele.thumbnail = thumbnail
            delete ele.preview
        });
        return {
            api: api,
            object: datas
        }
    },
    getPreviewFields: async (/** @type {Object} */ ctx) => {
        const defaultFields = ['id']
        const previewFields = await strapi.entityService.findOne('api::preview-setting.preview-setting', 1, { populate: 'entries' })
        // console.log('previewFields::: ', ctx.request.url.split('/')[3].split('.'))
        if (previewFields.entries) {
            const contentTypeStrings = ctx.request.url.split('/')[3].split('.')
            const contentType = contentTypeStrings[contentTypeStrings.length - 1]

            const entry = previewFields.entries.filter(entry => {
                console.log('entry.key::: ', entry.key, ' entry:: ', entry, ' contentType::: ', contentType)
                return entry.key === contentType
            })
            // console.log('entry::: ', entry)
            if (entry.length > 0 && entry[0].value) {
                // console.log('entry[0].fields for ::: ', contentType, entry[0].value)
                return entry[0].value.split(',')
            } else {
                return defaultFields
            }
        } else return defaultFields
    },
    simulateDetailResponse: async (/** @type {String} */ id,/** @type {Object} */ data) => {
        delete data.createdBy;
        delete data.updatedBy;
        delete data.id;

        return {
            version: Date.now(),
            data: {
                id: id,
                attributes: data,
            },
            meta: {}
        }
    },
    simulateListResponse: async (/** @type {Array<Object>} */ objects) => {
        return {
            version: Date.now(),
            data: objects.map(object => {

                return {
                    id: object.id,
                    attributes: object,
                }
            }),
            meta: {}
        }
    },

});
