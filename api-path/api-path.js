var host = "https://cwcsapi.smicee.com";

const FAPI = {
    'get_login': host + '/accounts/token/',

    // Dashboard
    'get_item_count': host+'/home/count/',

    // home 
    'create_home': host+'/home/create/',
    'get_home': host+'/home/list/',
    'get_status': host+'/home/active/toggle/',
    'delete_home': host+'/home/delete/',
    'edit_home': host+'/home/update/',
    'get_home_by_id': host+'/home/detail/',


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

    // Research and Publications
    'get_research': host + '/publications/list/',
    'post_research': host + '/publications/create/',
    'edit_research': host+ '/publications/update/',
    'delete_research': host+'/publications/delete/',
    'get_research_by_id': host+'/publications/details/',
    

    // contact api 
    'get_contact': host + '/contact/message/list/',
    'delete_contact': host+'/contact/delete/',
}

export default FAPI;