export const adminMenu = [
    { //hệ thống
        name: 'menu.admin.header', menus: [
            {
                name: 'menu.admin.crud-user', link: '/system/user-manage',
              
            },
            {
                name: 'menu.admin.crud-redux', link: '/system/redux-manage',
              
            },
            {
                name: 'menu.admin.manage-user',
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.redux-manage', link: '/system/redux-manage' },                  
                // ]
            },
            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor',
              
            },
            {
                name: 'menu.admin.schedule', link: '/doctor/schedule',
              
            },
          
        ]
    },
    {
        name:"menu.admin.clinic",menus:[
            {
                name:'menu.admin.manage-clinic',link:'/system/manage-clinic'
            }
        ]
    },
    {
        name:"menu.admin.speciality",menus:[
            {
                name:'menu.admin.manage-speciality',link:'/system/manage-speciality'
            }
        ]
    },
    {
        name:"menu.admin.handbook",menus:[
            {
                name:'menu.admin.manage-handbook',link:'/system/manage-handbook'
            }
        ]
    }
];

export const doctorMenu = [
    { //hệ thống
        name: 'menu.admin.manage-schedule', menus: [
            {
                name: 'menu.admin.schedule', link: '/doctor/schedule',
              
            }
          
        ]
    }
];