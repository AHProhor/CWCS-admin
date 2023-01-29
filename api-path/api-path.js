var host = "https://cwcsapi.smicee.com";

const FAPI = {
    'get_login': host + '/accounts/token/',

    // about us api

    'get_about_us': host+'/aboutus/list/',
    'post_about_us': host+'/aboutus/list/',
    'delete_about_us': host+'/aboutus/delete/',
    'update_about_us': host+'/aboutus/update/',

    // area of work api
    'get_AOW': host + '/areaofwork/list/',
    'post_AOW': host + '/areaofwork/create/',
    'edit_AOW': host+'/areaofwork/update/',
    'delete_AOW':host+'/areaofwork/delete/',
    'get_AOW_By_Slug':host+'/areaofwork/detail/',

    // projects api
    'get_projects': host + '/projects/list/',
    'post_projects': host + '/projects/create/',
    'edit_projects': host+'/projects/update/',
    'delete_project': host+'/projects/delete/',
    'get_project_by_slug':host+'/projects/details/',

    'ongoing_projects':host+'/projects/featured/',

    // gallery api 
    'get_gallery': host + '/gallery/list/',
    'post_gallery': host + '/gallery/create/',
    'edit_gallery': host+ '/gallery/update/',
    'delete_gallery': host+'/gallery/delete/',
    'get_gallery_by_slug': host+'/gallery/details/',

    'get_gallery_by_project': host+'/gallery/byProject/',

    // contact api 
    'get_contact': host + '/contact/message/list/',
    'delete_contact': host+'/contact/delete/',
}

export default FAPI;