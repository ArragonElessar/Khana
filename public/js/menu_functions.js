const menu = [{
    start_id: 1000,
    category: 'Fries and Sides',
    items: [
        { name: 'Hashbrown', rate: '38', id: 1000 },
        { name: 'Hashbrown', rate: '38', id: 1001 },
        { name: 'Piri Piri Spice Mix', rate: '22', id: 1002 },
        { name: 'Veg Pizza McPuff', rate: '41', id: 1003 },
        { name: 'Masala Wedges Regular', rate: '43', id: 1004 },
        { name: 'Masala Wedges Medium', rate: '92', id: 1005 },
        { name: 'Masala Wedges Large', rate: '111', id: 1006 },
        { name: 'Chicken McWings - 4 pcs', rate: '128', id: 1007 },
        { name: 'Chicken McWings - 8 pcs', rate: '246', id: 1008 },
        { name: 'Chicken McWings - 12 pcs', rate: '364', id: 1009 }
    ]
},
{
    start_id: 1010,
    category: 'Desserts',
    items: [
        { name: 'Soft Serve Cone', rate: '23', id: 1010 },
        { name: 'McSwirl', rate: '36', id: 1011 },
        { name: 'Hot Fudge Sundae Regular', rate: '38', id: 1012 },
        { name: 'Strawberry Sundae Regular', rate: '38', id: 1013 }
    ]
},
{
    start_id: 1014,
    category: 'Deals',
    items: [
        { name: '2 McAloo Tikki + 2 Fries Large', rate: '293', id: 1014 },
        {
            name: '2 McVeggie + 2 McAloo Tikki + 2 Fries Medium + 2 Strawberry Shakes',
            rate: '770',
            id: 1015
        },
        {
            name: 'McChicken + McVeggie + Fries Large + 2 Veg Pizza McPuff + Coke Medium',
            rate: '380',
            id: 1016
        },
        {
            name: '2 McVeggie + 2 American Cheese Supreme Veg + 2 Fries Large',
            rate: '647',
            id: 1017
        }
    ]
},
{
    start_id: 1018,
    category: 'Drinks',
    items: [
        { name: 'Coke Float', rate: '44', id: 1018 },
        { name: 'Coke Regular', rate: '71', id: 1019 },
        { name: 'Coke Medium', rate: '77', id: 1020 },
        { name: 'Coke Large', rate: '88', id: 1021 },
        { name: 'Raw Mango Fruit Splash Regular', rate: '97', id: 1022 },
        { name: 'Mccafe Iced Americano', rate: '128', id: 1023 },
        { name: 'Chocolate Shake', rate: '138', id: 1024 },
        { name: 'McCafe-Lemon Ice Tea Regular', rate: '138', id: 1025 },
        { name: 'Strawberry Shake', rate: '138', id: 1026 },
        {
            name: 'McCafe-Strawberry Ice Tea Regular',
            rate: '138',
            id: 1027
        },
        { name: 'McCafe-Green Apple Tea Regular', rate: '138', id: 1028 },
        { name: 'McCafe-Ice Coffee Regular', rate: '150', id: 1029 },
        { name: 'Mango Smoothie Small', rate: '152', id: 1030 },
        { name: 'McCafe-Classic Coffee Regular', rate: '177', id: 1031 },
        {
            name: 'McCafe-Vanilla Coffee Frappe Regular',
            rate: '192',
            id: 1032
        },
        { name: 'Choco hazelnut Shake', rate: '192', id: 1033 },
        { name: 'McCafe-Chocolate Frappe Regular', rate: '216', id: 1034 },
        { name: 'McCafe-Mocha Frappe Regular', rate: '216', id: 1035 },
        { name: 'Double Chocolate Frappe', rate: '227', id: 1036 },
        { name: 'Mango Smoothie', rate: '229', id: 1037 },
        { name: 'Mixed Berry Smoothie', rate: '229', id: 1038 },
        { name: 'Fanta Float', rate: '44', id: 1039 },
        { name: 'Schweppes Water', rate: '50', id: 1040 },
        { name: 'Ice tea (Georgia) Regular', rate: '71', id: 1041 },
        { name: 'Sprite Regular', rate: '71', id: 1042 },
        { name: 'Thums Up Regular', rate: '71', id: 1043 },
        { name: 'Fanta Regular', rate: '71', id: 1044 },
        { name: 'Tangy Orange fizz', rate: '71', id: 1045 },
        { name: 'Fanta Medium', rate: '71', id: 1046 },
        { name: 'Thums Up Medium', rate: '71', id: 1047 },
        { name: 'Sprite Medium', rate: '71', id: 1048 },
        { name: 'Sprite Large', rate: '88', id: 1049 },
        { name: 'Thums Up Large', rate: '88', id: 1050 },
        { name: 'Fanta Large', rate: '88', id: 1051 },
        { name: 'Oreo Cookie & Cream Shake', rate: '192', id: 1052 }
    ]
},
{
    start_id: 1053,
    category: 'Meals',
    items: [
        { name: 'McSaver McVeggie Meal', rate: '219', id: 1053 },
        { name: 'McSaver McSpicy Chicken Meal', rate: '275', id: 1054 },
        { name: 'McSaver McChicken Meal', rate: '229', id: 1055 },
        {
            name: 'McSaver American Cheese Supreme - Veg Meal',
            rate: '239',
            id: 1056
        },
        {
            name: 'McSaver Chicken Maharaja Mac Meal',
            rate: '310',
            id: 1057
        },
        { name: 'McAloo Tikki Meal Regular', rate: '138', id: 1058 },
        {
            name: 'Chatpata Naan - Aloo Meal Regular',
            rate: '152',
            id: 1059
        },
        { name: 'McAloo Tikki Meal Medium', rate: '162', id: 1060 },
        {
            name: 'Chatpata Naan - Kebab Meal Regular',
            rate: '168',
            id: 1061
        },
        {
            name: 'McSaver Chatpata Naan - Aloo Meal',
            rate: '176',
            id: 1062
        },
        { name: 'McAloo Tikki Meal Large', rate: '182', id: 1063 },
        {
            name: 'McSaver Chatpata Naan - Kebab Meal',
            rate: '190',
            id: 1064
        },
        {
            name: 'McSaver Chicken Kebab Burger Meal',
            rate: '193',
            id: 1065
        },
        { name: 'Chatpata Naan - Aloo Meal Large', rate: '196', id: 1066 },
        {
            name: 'American Cheese Supreme - Veg Meal Regular',
            rate: '207',
            id: 1067
        },
        { name: 'McChicken Meal Regular', rate: '207', id: 1068 },
        { name: 'Chatpata Naan - Kebab Meal Large', rate: '212', id: 1069 },
        { name: 'Chicken Kebab Burger Meal Large', rate: '215', id: 1070 },
        {
            name: 'American Cheese Supreme - Chicken Meal Regular',
            rate: '223',
            id: 1071
        },
        { name: 'McVeggie Meal Large', rate: '236', id: 1072 },
        { name: 'McSaver Salad Wrap Meal', rate: '242', id: 1073 },
        {
            name: 'McSaver American Cheese Supreme - Chicken Meal',
            rate: '244',
            id: 1074
        },
        { name: 'McSpicy Chicken Meal Regular', rate: '249', id: 1075 },
        { name: 'McChicken Meal Large', rate: '250', id: 1076 },
        {
            name: 'American Cheese Supreme - Veg Meal Large',
            rate: '250',
            id: 1077
        },
        {
            name: 'Chicken Kebab Double patty Meal Medium',
            rate: '251',
            id: 1078
        },
        {
            name: 'Chicken McNuggets 6 Pcs Meal Medium',
            rate: '257',
            id: 1079
        },
        { name: 'Salad Wrap Meal Large', rate: '259', id: 1080 },
        { name: 'McSaver McSpicy Paneer Meal', rate: '267', id: 1081 },
        {
            name: 'American Cheese Supreme - Chicken Meal Large',
            rate: '267',
            id: 1082
        },
        {
            name: 'Chicken Kebab Double patty Meal Large',
            rate: '269',
            id: 1083
        },
        { name: 'McSaver Filet-O-Fish Meal', rate: '271', id: 1084 },
        {
            name: 'Chicken McNuggets 6 Pcs Meal Large',
            rate: '274',
            id: 1085
        },
        { name: 'Filet-O-Fish Meal Large', rate: '276', id: 1086 },
        {
            name: 'Big Spicy Paneer Wrap Meal Regular',
            rate: '279',
            id: 1087
        },
        { name: 'Veg Maharaja Mac Meal Regular', rate: '279', id: 1088 },
        {
            name: 'Chicken McNuggets Piri Piri 6 Pcs Meal Medium',
            rate: '280',
            id: 1089
        },
        { name: 'McSpicy Paneer Meal Large', rate: '289', id: 1090 },
        {
            name: 'Big Spicy Chicken Wrap Meal Regular',
            rate: '289',
            id: 1091
        },
        {
            name: 'Chicken Maharaja Mac Meal Regular',
            rate: '289',
            id: 1092
        },
        {
            name: 'Chicken McNuggets 9 Pcs Meal Medium',
            rate: '290',
            id: 1093
        },
        { name: 'McSpicy Chicken Meal Large', rate: '293', id: 1094 },
        {
            name: 'Chicken McNuggets Piri Piri 6 Pcs Meal Large',
            rate: '296',
            id: 1095
        },
        {
            name: 'McSaver Big Spicy Paneer Wrap Meal',
            rate: '299',
            id: 1096
        },
        { name: 'McSaver Veg Maharaja Mac Meal', rate: '299', id: 1097 },
        {
            name: 'Chicken McNuggets 9 Pcs Meal Large',
            rate: '306',
            id: 1098
        },
        {
            name: 'McSaver Big Spicy Chicken Wrap Meal',
            rate: '310',
            id: 1099
        },
        {
            name: 'Chicken McNuggets Piri Piri 9 Pcs Meal Medium',
            rate: '313',
            id: 1100
        },
        { name: 'Big Spicy Paneer Wrap Meal Large', rate: '323', id: 1101 },
        { name: 'Veg Maharaja Mac Meal Large', rate: '323', id: 1102 },
        {
            name: 'Chicken McNuggets Piri Piri 9 Pcs Meal Large',
            rate: '330',
            id: 1103
        },
        {
            name: 'Big Spicy Chicken Wrap Meal Large',
            rate: '333',
            id: 1104
        },
        { name: 'Chicken Maharaja Mac Meal Large', rate: '333', id: 1105 }
    ]
},
{
    start_id: 1106,
    category: 'Super Combo',
    items: [
        { name: '2 McAloo Tikki + 2 Fries Large', rate: '293', id: 1106 },
        {
            name: '2 McVeggie + 2 McAloo Tikki + 2 Fries Medium + 2 Strawberry Shakes',
            rate: '770',
            id: 1107
        },
        {
            name: '2 McVeggie + 2 American Cheese Supreme Veg + 2 Fries Large',
            rate: '647',
            id: 1108
        },
        {
            name: '2 American Cheese Supreme Veg + 2 Veg Pizza McPuff + 2 Fries Large + Coke Medium',
            rate: '550',
            id: 1109
        },
        {
            name: '2 American Cheese Supreme Chicken + Chicken McNuggets 6 Pc + 2 Fries Large + Coke Medium',
            rate: '602',
            id: 1110
        },
        {
            name: 'McSpicy Paneer + McSpicy Chicken + 2 Fries Large + Coke Medium',
            rate: '606',
            id: 1111
        },
        {
            name: '2 McSpicy Paneer + 2 Veg Pizza McPuff + 2 Fries Large + Coke Medium',
            rate: '688',
            id: 1112
        },
        {
            name: '2 McVeggie + 2 McAloo Tikki + 2 Fries Medium + 2 Chocolate Shakes',
            rate: '770',
            id: 1113
        },
        {
            name: '2 American Cheese Supreme Chicken + 2 Fries Large + 2 Chocolate Shakes',
            rate: '790',
            id: 1114
        },
        {
            name: '2 McSpicy Chicken + 2 Fries Large + 2 Chocolate Shakes',
            rate: '845',
            id: 1115
        },
        {
            name: 'McSpicy Chicken + American Cheese Supreme + McChicken + Chicken Maharaja + 3 Fries Large',
            rate: '913',
            id: 1116
        }
    ]
},
{
    start_id: 1117,
    category: 'Burgers and Wraps',
    items: [
        { name: 'McChicken Burger', rate: '112', id: 1117 },
        { name: 'McSpicy Chicken Burger', rate: '159', id: 1118 },
        { name: 'McVeggie Burger', rate: '118', id: 1119 },
        { name: 'McSpicy Paneer Burger', rate: '159', id: 1120 },
        { name: 'Big Spicy Chicken Wrap', rate: '194', id: 1121 },
        { name: 'Big Spicy Paneer Wrap', rate: '184', id: 1122 },
        { name: 'Filet-O-Fish Burger', rate: '138', id: 1123 },
        { name: 'Mexican McAlooTikki Burger', rate: '50', id: 1124 },
        { name: 'Chicken Maharaja Mac', rate: '194', id: 1125 },
        {
            name: 'American Cheese Supreme - Chicken',
            rate: '127',
            id: 1126
        },
        { name: 'McAloo Tikki Burger', rate: '45', id: 1127 },
        { name: 'Chatpata Naan - Aloo', rate: '59', id: 1128 },
        { name: 'Chatpata Naan - Kebab', rate: '76', id: 1129 },
        { name: 'Chicken Kebab Burger', rate: '76', id: 1130 },
        { name: 'American Cheese Supreme - Veg', rate: '118', id: 1131 },
        { name: 'Salad Wrap', rate: '123', id: 1132 },
        {
            name: 'Chicken Kebab Double Patty Burger',
            rate: '132',
            id: 1133
        },
        { name: 'Veg Maharaja Mac', rate: '184', id: 1134 }
    ]
},
{
    start_id: 1135,
    category: 'Happy Meals',
    items: [
        { name: 'Masala Wedges Small Happy Mea', rate: '126', id: 1135 },
        { name: 'Masala Wedges Medium Happy Meal', rate: '175', id: 1136 },
        { name: 'Masala Wedges Large Happy Meal', rate: '192', id: 1137 },
        {
            name: 'American Cheese Supreme - Chicken Happy Meal',
            rate: '196',
            id: 1138
        },
        { name: 'McVeggie Happy Meal', rate: '182', id: 1139 },
        {
            name: 'American Cheese Supreme - Veg Happy Meal',
            rate: '213',
            id: 1140
        },
        { name: 'Mcchicken Happy mea', rate: '196', id: 1141 },
        { name: 'McAloo Tikki Happy Meal', rate: '128', id: 1142 }
    ]
},
{
    start_id: 1143,
    category: 'Popular Menu',
    items: [
        { name: 'McChicken Burger', rate: '112', id: 1143 },
        { name: 'McSpicy Chicken Burger', rate: '159', id: 1144 },
        { name: 'McVeggie Burger', rate: '118', id: 1145 },
        { name: 'McSpicy Paneer Burger', rate: '159', id: 1146 },
        { name: 'Big Spicy Chicken Wrap', rate: '194', id: 1147 },
        { name: 'Big Spicy Paneer Wrap', rate: '184', id: 1148 },
        { name: 'Chicken McNuggets - 6 Pcs', rate: '137', id: 1149 },
        { name: 'Filet-O-Fish Burger', rate: '138', id: 1150 },
        { name: 'Chicken McNuggets - 9 Pcs', rate: '171', id: 1151 },
        { name: 'Chicken McNuggets - 20 Pcs', rate: '304', id: 1152 }
    ]
}]

function sendItemsbyCategory(category) {
    for (let i = 0; i < menu.length; i++) {
        if (menu[i].category == category) {
            return menu[i].items
        }
    }
    return [];
}
function sendItemsbyId(id) {
    for (let i = 0; i < menu.length; i++) {
        if (id >= menu[i].start_id && id < menu[i + 1].start_id) {
            for (let j = 0; j < menu[i].items.length; j++) {
                if (menu[i].items[j].id == id) {
                    return menu[i].items[j]
                }
            }
        }
    }
    return
}
module.exports = {
    sendItemsbyCategory,
    sendItemsbyId
}





