import type { Schema, Attribute } from '@strapi/strapi';

export interface BasicKeyValuePair extends Schema.Component {
  collectionName: 'components_basic_key_value_pairs';
  info: {
    displayName: 'key&value';
    description: '';
  };
  attributes: {
    key: Attribute.String;
    value: Attribute.String;
  };
}

export interface ContentKeyword extends Schema.Component {
  collectionName: 'components_content_keywords';
  info: {
    displayName: 'Keyword';
    description: '';
  };
  attributes: {
    keyword: Attribute.String;
    tags: Attribute.JSON & Attribute.CustomField<'plugin::tagsinput.tags'>;
    detail: Attribute.Text;
    image: Attribute.Media;
    index: Attribute.Integer;
  };
}

export interface ContentSocialLink extends Schema.Component {
  collectionName: 'components_content_social_links';
  info: {
    displayName: 'Social Link';
  };
  attributes: {
    Name: Attribute.String;
    index: Attribute.Integer;
    Link: Attribute.String;
    Logo: Attribute.Media;
  };
}

export interface SharedMedia extends Schema.Component {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Attribute.Media;
  };
}

export interface SharedQuote extends Schema.Component {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    title: Attribute.String;
    body: Attribute.Text;
  };
}

export interface SharedRichText extends Schema.Component {
  collectionName: 'components_shared_rich_texts';
  info: {
    displayName: 'Rich text';
    icon: 'align-justify';
    description: '';
  };
  attributes: {
    body: Attribute.RichText;
  };
}

export interface SharedSeo extends Schema.Component {
  collectionName: 'components_shared_seos';
  info: {
    name: 'Seo';
    icon: 'allergies';
    displayName: 'Seo';
    description: '';
  };
  attributes: {
    metaTitle: Attribute.String & Attribute.Required;
    metaDescription: Attribute.Text & Attribute.Required;
    shareImage: Attribute.Media;
  };
}

export interface SharedSlider extends Schema.Component {
  collectionName: 'components_shared_sliders';
  info: {
    displayName: 'Slider';
    icon: 'address-book';
    description: '';
  };
  attributes: {
    files: Attribute.Media;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'basic.key-value-pair': BasicKeyValuePair;
      'content.keyword': ContentKeyword;
      'content.social-link': ContentSocialLink;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
