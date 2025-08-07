import type { Schema, Struct } from '@strapi/strapi';

export interface ElementsButton extends Struct.ComponentSchema {
  collectionName: 'components_elements_buttons';
  info: {
    displayName: 'Button';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsHeaderLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_header_links';
  info: {
    displayName: 'HeaderLink';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsLinks extends Struct.ComponentSchema {
  collectionName: 'components_elements_links';
  info: {
    displayName: 'Links';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    Name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsLogo extends Struct.ComponentSchema {
  collectionName: 'components_elements_logos';
  info: {
    displayName: 'Logo';
  };
  attributes: {
    HeaderActiveImage: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    Image: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
  };
}

export interface ElementsSocialLinks extends Struct.ComponentSchema {
  collectionName: 'components_elements_social_links';
  info: {
    displayName: 'SocialLinks';
  };
  attributes: {
    platform_icon: Schema.Attribute.Media<'images' | 'files'>;
    platform_name: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface LayoutApplyIdea extends Struct.ComponentSchema {
  collectionName: 'components_layout_apply_ideas';
  info: {
    displayName: 'ApplyIdea';
  };
  attributes: {
    SubmitPitch: Schema.Attribute.Blocks;
    TitleWithShortText: Schema.Attribute.Component<
      'layout.titlewith-short-text',
      false
    >;
  };
}

export interface LayoutCard extends Struct.ComponentSchema {
  collectionName: 'components_layout_cards';
  info: {
    displayName: 'Card';
  };
  attributes: {
    button: Schema.Attribute.Component<'elements.button', false>;
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    text: Schema.Attribute.Text;
    title: Schema.Attribute.Blocks;
  };
}

export interface LayoutCardWithLogo extends Struct.ComponentSchema {
  collectionName: 'components_layout_card_with_logos';
  info: {
    displayName: 'CardWithLogo';
  };
  attributes: {
    Button: Schema.Attribute.Component<'elements.button', false>;
    Image: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    Logo: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    Text: Schema.Attribute.Text;
  };
}

export interface LayoutContactCard extends Struct.ComponentSchema {
  collectionName: 'components_layout_contact_cards';
  info: {
    displayName: 'ContactCard';
  };
  attributes: {
    Info: Schema.Attribute.String;
    Logo: Schema.Attribute.Media<'files' | 'images'> &
      Schema.Attribute.Required;
    Title: Schema.Attribute.String;
  };
}

export interface LayoutContactForm extends Struct.ComponentSchema {
  collectionName: 'components_layout_contact_forms';
  info: {
    displayName: 'ContactForm';
  };
  attributes: {
    Card: Schema.Attribute.Component<'layout.contact-card', true>;
    Title: Schema.Attribute.String;
  };
}

export interface LayoutContentBlock extends Struct.ComponentSchema {
  collectionName: 'components_layout_content_blocks';
  info: {
    displayName: 'ContentBlock';
  };
  attributes: {
    Background: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    leftText: Schema.Attribute.String;
    rightText: Schema.Attribute.Blocks & Schema.Attribute.Required;
    subText: Schema.Attribute.Blocks;
  };
}

export interface LayoutExploreCapabilities extends Struct.ComponentSchema {
  collectionName: 'components_layout_explore_capabilities';
  info: {
    displayName: 'ExploreCapabilities';
  };
  attributes: {
    Card: Schema.Attribute.Component<'layout.what-we-do-card', true>;
  };
}

export interface LayoutFaq extends Struct.ComponentSchema {
  collectionName: 'components_layout_faqs';
  info: {
    displayName: 'FAQ';
  };
  attributes: {
    Answer: Schema.Attribute.Blocks;
    Question: Schema.Attribute.String;
  };
}

export interface LayoutFeatureCard extends Struct.ComponentSchema {
  collectionName: 'components_layout_feature_cards';
  info: {
    displayName: 'FeatureCard';
  };
  attributes: {
    card: Schema.Attribute.Component<'layout.card', true>;
  };
}

export interface LayoutFeatureItem extends Struct.ComponentSchema {
  collectionName: 'components_layout_feature_items';
  info: {
    displayName: 'FeatureItem';
  };
  attributes: {
    Item: Schema.Attribute.Component<'layout.item', true> &
      Schema.Attribute.Required;
    subTitle: Schema.Attribute.String;
    title: Schema.Attribute.Blocks;
  };
}

export interface LayoutFeatureItemWhoWeAre extends Struct.ComponentSchema {
  collectionName: 'components_layout_feature_item_who_we_ares';
  info: {
    displayName: 'FeatureItemWhoWeAre';
  };
  attributes: {
    Card: Schema.Attribute.Component<'layout.item-with-rich-text', true>;
    SubTitile: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

export interface LayoutFilterableGallery extends Struct.ComponentSchema {
  collectionName: 'components_layout_filterable_galleries';
  info: {
    displayName: 'FilterableGallery';
  };
  attributes: {
    items: Schema.Attribute.Component<'layout.gallery-item', true>;
  };
}

export interface LayoutFooter extends Struct.ComponentSchema {
  collectionName: 'components_layout_footers';
  info: {
    displayName: 'Footer';
  };
  attributes: {
    customization_prompt: Schema.Attribute.String;
    FooterNavigation: Schema.Attribute.Component<
      'layout.footer-navigation',
      false
    >;
    FooterSocial: Schema.Attribute.Component<'layout.footer-social', false>;
    location: Schema.Attribute.Blocks;
    Mobile_button: Schema.Attribute.Component<'elements.button', false>;
    Name: Schema.Attribute.Blocks;
    PrivacyPolicy: Schema.Attribute.Component<'elements.links', false>;
    RenewEdge: Schema.Attribute.String;
    Start_journey: Schema.Attribute.Component<'elements.button', false>;
  };
}

export interface LayoutFooterNavigation extends Struct.ComponentSchema {
  collectionName: 'components_layout_footer_navigations';
  info: {
    displayName: 'FooterNavigation';
  };
  attributes: {
    Link: Schema.Attribute.Component<'elements.links', true>;
    Title: Schema.Attribute.String;
  };
}

export interface LayoutFooterSocial extends Struct.ComponentSchema {
  collectionName: 'components_layout_footer_socials';
  info: {
    displayName: 'FooterSocial';
  };
  attributes: {
    Link: Schema.Attribute.Component<'elements.social-links', true>;
    Title: Schema.Attribute.String;
  };
}

export interface LayoutGalleryItem extends Struct.ComponentSchema {
  collectionName: 'components_layout_gallery_items';
  info: {
    displayName: 'GalleryItem';
  };
  attributes: {
    article: Schema.Attribute.Relation<'oneToOne', 'api::article.article'>;
    Button: Schema.Attribute.Component<'elements.button', false>;
    description: Schema.Attribute.String;
    gallery_category: Schema.Attribute.Relation<
      'oneToOne',
      'api::gallery-category.gallery-category'
    >;
    Image: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
  };
}

export interface LayoutGoalsWhoWeAre extends Struct.ComponentSchema {
  collectionName: 'components_layout_goals_who_we_ares';
  info: {
    displayName: 'GoalsWhoWeAre';
  };
  attributes: {
    Goals: Schema.Attribute.Component<'layout.titlewith-short-text', true>;
    Title: Schema.Attribute.Component<'layout.titlewith-short-text', false>;
  };
}

export interface LayoutHero extends Struct.ComponentSchema {
  collectionName: 'components_layout_heroes';
  info: {
    displayName: 'Hero';
  };
  attributes: {
    Button: Schema.Attribute.Component<'elements.button', false>;
    smallText: Schema.Attribute.Text;
    text: Schema.Attribute.Blocks & Schema.Attribute.Required;
  };
}

export interface LayoutImageSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_image_sections';
  info: {
    displayName: 'ImageSection';
  };
  attributes: {
    ImageWithText: Schema.Attribute.Component<
      'layout.image-with-text-card',
      true
    >;
    leftText: Schema.Attribute.String;
    RightText: Schema.Attribute.Blocks;
  };
}

export interface LayoutImageWithTextCard extends Struct.ComponentSchema {
  collectionName: 'components_layout_image_with_text_cards';
  info: {
    displayName: 'ImageWithTextCard';
  };
  attributes: {
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Title: Schema.Attribute.Blocks;
  };
}

export interface LayoutItem extends Struct.ComponentSchema {
  collectionName: 'components_layout_items';
  info: {
    displayName: 'Item';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    text: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface LayoutItemWithRichText extends Struct.ComponentSchema {
  collectionName: 'components_layout_item_with_rich_texts';
  info: {
    displayName: 'ItemWithRichText';
  };
  attributes: {
    Description: Schema.Attribute.Text;
    Image: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    Title: Schema.Attribute.Blocks;
  };
}

export interface LayoutItemsCardSlugPage extends Struct.ComponentSchema {
  collectionName: 'components_layout_items_card_slug_pages';
  info: {
    displayName: 'ItemsCardSlugPage';
  };
  attributes: {
    Button: Schema.Attribute.Component<'elements.button', true>;
    smallTitle: Schema.Attribute.String;
    Title: Schema.Attribute.Blocks;
    TitleWithContent: Schema.Attribute.Component<
      'layout.rich-text-title-with-content',
      true
    >;
  };
}

export interface LayoutOurPartnership extends Struct.ComponentSchema {
  collectionName: 'components_layout_our_partnerships';
  info: {
    displayName: 'OurPartnership';
  };
  attributes: {
    Card: Schema.Attribute.Component<'layout.image-with-text-card', true>;
    leftText: Schema.Attribute.String;
    RightText: Schema.Attribute.Blocks;
  };
}

export interface LayoutPartnershipFaq extends Struct.ComponentSchema {
  collectionName: 'components_layout_partnership_faqs';
  info: {
    displayName: 'PartnershipFaq';
  };
  attributes: {
    FAQ: Schema.Attribute.Component<'layout.faq', true>;
    LeftText: Schema.Attribute.String;
    rightText: Schema.Attribute.String;
  };
}

export interface LayoutPolicies extends Struct.ComponentSchema {
  collectionName: 'components_layout_policies';
  info: {
    displayName: 'Policies';
  };
  attributes: {
    Info: Schema.Attribute.Blocks;
    Title: Schema.Attribute.Blocks;
  };
}

export interface LayoutPrivacyPolicy extends Struct.ComponentSchema {
  collectionName: 'components_layout_privacy_policies';
  info: {
    displayName: 'PrivacyPolicy';
  };
  attributes: {
    PrivacyPolicy: Schema.Attribute.Component<'layout.policies', true>;
  };
}

export interface LayoutRichTextTitleWithContent extends Struct.ComponentSchema {
  collectionName: 'components_layout_rich_text_title_with_contents';
  info: {
    displayName: 'RichTextTitleWithContent';
  };
  attributes: {
    Content: Schema.Attribute.Blocks;
    Title: Schema.Attribute.Blocks;
  };
}

export interface LayoutStep extends Struct.ComponentSchema {
  collectionName: 'components_layout_steps';
  info: {
    displayName: 'Step';
  };
  attributes: {
    LeftText: Schema.Attribute.Blocks;
    RightText: Schema.Attribute.Blocks;
  };
}

export interface LayoutStepItem extends Struct.ComponentSchema {
  collectionName: 'components_layout_step_items';
  info: {
    displayName: 'StepItem';
  };
  attributes: {
    Button: Schema.Attribute.Component<'elements.button', false>;
    Step: Schema.Attribute.Component<'layout.step', true>;
    text: Schema.Attribute.Text;
  };
}

export interface LayoutTargetAudienceSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_target_audience_sections';
  info: {
    displayName: 'TargetAudienceSection';
  };
  attributes: {
    Item: Schema.Attribute.Component<'layout.item', true>;
  };
}

export interface LayoutTitlewithShortText extends Struct.ComponentSchema {
  collectionName: 'components_layout_titlewith_short_texts';
  info: {
    displayName: 'TitlewithShortText';
  };
  attributes: {
    ShortText: Schema.Attribute.String;
    Title: Schema.Attribute.Blocks;
  };
}

export interface LayoutTopNav extends Struct.ComponentSchema {
  collectionName: 'components_layout_top_navs';
  info: {
    displayName: 'TopNav';
  };
  attributes: {
    headerLink: Schema.Attribute.Component<'elements.header-link', true>;
    logo: Schema.Attribute.Component<'elements.logo', false>;
  };
}

export interface LayoutVerticaleSlider extends Struct.ComponentSchema {
  collectionName: 'components_layout_verticale_sliders';
  info: {
    displayName: 'VerticaleSlider';
  };
  attributes: {
    Button: Schema.Attribute.Component<'elements.button', false>;
    SliderItem: Schema.Attribute.Component<
      'layout.verticale-slider-item',
      true
    >;
    SmallTitle: Schema.Attribute.String;
    Title: Schema.Attribute.Blocks;
  };
}

export interface LayoutVerticaleSliderItem extends Struct.ComponentSchema {
  collectionName: 'components_layout_verticale_slider_items';
  info: {
    displayName: 'VerticaleSliderItem';
  };
  attributes: {
    ItemContent: Schema.Attribute.Blocks;
  };
}

export interface LayoutWhatWeDoCard extends Struct.ComponentSchema {
  collectionName: 'components_layout_what_we_do_cards';
  info: {
    displayName: 'WhatWeDoCard';
  };
  attributes: {
    Button: Schema.Attribute.Component<'elements.button', false>;
    Content: Schema.Attribute.Blocks;
    Image: Schema.Attribute.Media<'images' | 'files'>;
    Title: Schema.Attribute.Blocks;
  };
}

export interface SharedOpenGraph extends Struct.ComponentSchema {
  collectionName: 'components_shared_open_graphs';
  info: {
    displayName: 'openGraph';
    icon: 'project-diagram';
  };
  attributes: {
    ogDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    ogTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 70;
      }>;
    ogType: Schema.Attribute.String;
    ogUrl: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
        minLength: 50;
      }>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    openGraph: Schema.Attribute.Component<'shared.open-graph', false>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'elements.button': ElementsButton;
      'elements.header-link': ElementsHeaderLink;
      'elements.links': ElementsLinks;
      'elements.logo': ElementsLogo;
      'elements.social-links': ElementsSocialLinks;
      'layout.apply-idea': LayoutApplyIdea;
      'layout.card': LayoutCard;
      'layout.card-with-logo': LayoutCardWithLogo;
      'layout.contact-card': LayoutContactCard;
      'layout.contact-form': LayoutContactForm;
      'layout.content-block': LayoutContentBlock;
      'layout.explore-capabilities': LayoutExploreCapabilities;
      'layout.faq': LayoutFaq;
      'layout.feature-card': LayoutFeatureCard;
      'layout.feature-item': LayoutFeatureItem;
      'layout.feature-item-who-we-are': LayoutFeatureItemWhoWeAre;
      'layout.filterable-gallery': LayoutFilterableGallery;
      'layout.footer': LayoutFooter;
      'layout.footer-navigation': LayoutFooterNavigation;
      'layout.footer-social': LayoutFooterSocial;
      'layout.gallery-item': LayoutGalleryItem;
      'layout.goals-who-we-are': LayoutGoalsWhoWeAre;
      'layout.hero': LayoutHero;
      'layout.image-section': LayoutImageSection;
      'layout.image-with-text-card': LayoutImageWithTextCard;
      'layout.item': LayoutItem;
      'layout.item-with-rich-text': LayoutItemWithRichText;
      'layout.items-card-slug-page': LayoutItemsCardSlugPage;
      'layout.our-partnership': LayoutOurPartnership;
      'layout.partnership-faq': LayoutPartnershipFaq;
      'layout.policies': LayoutPolicies;
      'layout.privacy-policy': LayoutPrivacyPolicy;
      'layout.rich-text-title-with-content': LayoutRichTextTitleWithContent;
      'layout.step': LayoutStep;
      'layout.step-item': LayoutStepItem;
      'layout.target-audience-section': LayoutTargetAudienceSection;
      'layout.titlewith-short-text': LayoutTitlewithShortText;
      'layout.top-nav': LayoutTopNav;
      'layout.verticale-slider': LayoutVerticaleSlider;
      'layout.verticale-slider-item': LayoutVerticaleSliderItem;
      'layout.what-we-do-card': LayoutWhatWeDoCard;
      'shared.open-graph': SharedOpenGraph;
      'shared.seo': SharedSeo;
    }
  }
}
