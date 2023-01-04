var host = "https://cmsapi.smicee.com";

const FAPI = {
    'get_login': host + '/accounts/token/',

    'get_AOW': host + '/areaofwork/list/',
    'post_AOW': host + '/areaofwork/create/',
    'edit_AOW': host+'/areaofwork/update/',
    'delete_AOW':host+'/areaofwork/delete/',
    'get_AOW_By_Slug':host+'/areaofwork/detail/',

    'get_projects': host + '/projects/list/',
    'post_projects': host + '/projects/create/',
    'edit_projects': host+'/projects/update/',
    'delete_project': host+'/projects/delete/',
    'get_project_by_slug':host+'/projects/details/',


    'get_campaigns': host + '/campaigns/list/',
    'post_campaign': host + '/campaigns/create/',
    'edit_campaigns': host+ '/campaigns/update/',
    'delete_campaign': host+'/campaigns/delete/',
    'get_campaign_by_slug': host+'/campaigns/details/',

    'get_gallery': host + '/gallery/list/',
    'post_gallery': host + '/gallery/create/',
    'edit_gallery': host+ '/gallery/update/',
    'delete_gallery_data': host+'/gallery/delete/',
    'get_gallery_by_slug': host+'/gallery/details/',

    'get_contact': host + '/contact/message/list/',
    'delete_contact': host+'/contact/delete/',
}

export default FAPI;