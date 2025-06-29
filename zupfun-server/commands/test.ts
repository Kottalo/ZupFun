import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import _ from 'lodash'

import * as schema from '@db/schema';

// Disable prefetch as it is not supported for "Transaction" pool mode 
const client = postgres(process.env.DATABASE_URL!, { prepare: false })
const db = drizzle({ client });

const data = [
  {
    "id": 18,
    "created_at": "2025-06-28T10:02:40.065777+00:00",
    "name": "菜香豆腐",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8Y2WkWZHR9ZoClFKxirgnjsBUsRDtpJD_jA&s",
    "selection_id": 2
  },
  {
    "id": 19,
    "created_at": "2025-06-28T10:02:58.719455+00:00",
    "name": "柠檬鸡丁",
    "image": "https://lauhomecook.com/wp-content/uploads/2022/07/f7d2a4cdea1877ac3ae39d220a48d3e4_lemon-chicken-028_744_419.jpg",
    "selection_id": 2
  },
  {
    "id": 1,
    "created_at": "2025-06-27T12:09:18.563273+00:00",
    "name": "酱蒸巴丁鱼块",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUqoOAXtp8PcebZ6mL8i56vYzBBNGRckUiKA&s",
    "selection_id": 1
  },
  {
    "id": 2,
    "created_at": "2025-06-28T09:57:29.65021+00:00",
    "name": "南乳炸肉",
    "image": "https://i.pinimg.com/736x/7c/da/7a/7cda7a22a6a82b310c93b7d01da13f88.jpg",
    "selection_id": 1
  },
  {
    "id": 3,
    "created_at": "2025-06-28T09:58:07.029352+00:00",
    "name": "妈蜜鸡丁",
    "image": "https://i.ytimg.com/vi/FADjhu7aBV8/maxresdefault.jpg",
    "selection_id": 1
  },
  {
    "id": 4,
    "created_at": "2025-06-28T09:58:28.059854+00:00",
    "name": "咸蛋鸡块",
    "image": "https://i.ytimg.com/vi/ESlzJdpi4Og/maxresdefault.jpg",
    "selection_id": 1
  },
  {
    "id": 5,
    "created_at": "2025-06-28T09:58:51.122216+00:00",
    "name": "蒸多利鱼块",
    "image": "",
    "selection_id": 1
  },
  {
    "id": 6,
    "created_at": "2025-06-28T09:59:15.269208+00:00",
    "name": "咖喱鸡",
    "image": "https://mylovelyrecipes.com/wp-content/uploads/2020/05/Malaysian-Curry-Chicken_r-500x500.jpg",
    "selection_id": 1
  },
  {
    "id": 7,
    "created_at": "2025-06-28T09:59:35.875771+00:00",
    "name": "金香鸡丁",
    "image": "https://i.ytimg.com/vi/zuoARLOLFFs/sddefault.jpg",
    "selection_id": 1
  },
  {
    "id": 8,
    "created_at": "2025-06-28T09:59:54.685684+00:00",
    "name": "卤花肉",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_zGc1my4k-R3m6MvI0NSGSHZ2S8-fqArIAg&s",
    "selection_id": 1
  },
  {
    "id": 9,
    "created_at": "2025-06-28T10:00:13.278774+00:00",
    "name": "煎甘邦鱼",
    "image": "https://www.nanyangkitchen.co/wp-content/uploads/2020/01/069.-%E9%BB%84%E5%A7%9C%E7%B2%89%E7%82%B8%E7%94%98%E6%A6%9C%E9%B1%BC-Deep-Fried-Ikan-Kembung-with-Turmeric-Powder-YT.jpg",
    "selection_id": 1
  },
  {
    "id": 10,
    "created_at": "2025-06-28T10:00:35.793046+00:00",
    "name": "古早豆豉焖花肉",
    "image": "https://i.ytimg.com/vi/AqHI_tHtuLA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDgNgHryNmz3VsiF8cLtVPlDgLaCA",
    "selection_id": 1
  },
  {
    "id": 11,
    "created_at": "2025-06-28T10:00:50.527436+00:00",
    "name": "奶油鸡丁",
    "image": "https://www.orientalcuisine.my/wp-content/uploads/2021/12/4.salted-chicken-web.gif",
    "selection_id": 2
  },
  {
    "id": 12,
    "created_at": "2025-06-28T10:01:06.803763+00:00",
    "name": "猪脚醋",
    "image": "https://www.nanyangkitchen.co/wp-content/uploads/2020/04/%E7%8C%AA%E8%84%9A%E9%86%8B-scaled.jpg",
    "selection_id": 2
  },
  {
    "id": 13,
    "created_at": "2025-06-28T10:01:21.389202+00:00",
    "name": "娘惹鱼",
    "image": "https://www.nanyangkitchen.co/wp-content/uploads/2022/03/Nyonya-Asam-Fish-YT2-500x500.jpg",
    "selection_id": 2
  },
  {
    "id": 14,
    "created_at": "2025-06-28T10:01:33.765161+00:00",
    "name": "蒸非洲鱼片",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA2Io_M0tua8aOedJ1sM2M0qWn1EHk9tsoDw&s",
    "selection_id": 2
  },
  {
    "id": 15,
    "created_at": "2025-06-28T10:01:51.797651+00:00",
    "name": "姜葱鸡",
    "image": "https://i.ytimg.com/vi/13H24SVGw4M/maxresdefault.jpg",
    "selection_id": 2
  },
  {
    "id": 16,
    "created_at": "2025-06-28T10:02:11.32031+00:00",
    "name": "南乳鸡",
    "image": "https://i.ytimg.com/vi/c0xIuThzrVc/maxresdefault.jpg",
    "selection_id": 2
  },
  {
    "id": 17,
    "created_at": "2025-06-28T10:02:25.509949+00:00",
    "name": "酸甜鸡丁",
    "image": "https://tokyo-kitchen.icook.network/uploads/step/cover/1085059/9f6c6ba0ec856e74.jpg",
    "selection_id": 2
  },
  {
    "id": 20,
    "created_at": "2025-06-28T10:03:13.35778+00:00",
    "name": "煎绞鱼",
    "image": "https://i.ytimg.com/vi/Bs-Pm9r8v3U/maxresdefault.jpg",
    "selection_id": 2
  },
  {
    "id": 21,
    "created_at": "2025-06-28T10:03:27.582799+00:00",
    "name": "椒盐鸡",
    "image": "https://imgcache.dealmoon.com/fsvrugccache.dealmoon.com/ugc/296/a68/2c5/42a348b4231dddf40429b61.jpg_1280_1280_3_0c1a.jpg",
    "selection_id": 3
  },
  {
    "id": 22,
    "created_at": "2025-06-28T10:03:41.881905+00:00",
    "name": "卤豆腐",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnYAUyYuyz-d17X7GzrV09xQIrfzVDT_TL5A&s",
    "selection_id": 2
  },
  {
    "id": 23,
    "created_at": "2025-06-28T10:03:56.815459+00:00",
    "name": "宫保鸡丁",
    "image": "https://q2.itc.cn/images01/20241104/b7b1d8b2b45b41a4b4c98b18cddc1b51.jpeg",
    "selection_id": 3
  },
  {
    "id": 24,
    "created_at": "2025-06-28T10:04:09.736981+00:00",
    "name": "香辣鸡",
    "image": "https://i.ytimg.com/vi/C2EleP3Jz7E/sddefault.jpg?v=64196f0c",
    "selection_id": 3
  },
  {
    "id": 25,
    "created_at": "2025-06-28T10:04:20.494671+00:00",
    "name": "客家炸肉",
    "image": "https://www.nanyangkitchen.co/wp-content/uploads/2024/01/Hakka-Zhar-Yoke-500x500.jpg",
    "selection_id": 3
  },
  {
    "id": 26,
    "created_at": "2025-06-28T10:04:39.828664+00:00",
    "name": "咸鱼蒸花肉片",
    "image": "https://orientalcuisine.my/wp-content/uploads/2021/10/3.Steamed-Pork-Belly-web.gif?x91176",
    "selection_id": 3
  },
  {
    "id": 27,
    "created_at": "2025-06-28T10:05:02.496431+00:00",
    "name": "豆豉鲮鱼",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSURD8ja5iEzThOMeORiaMed0jjW_H5ufRsvg&s",
    "selection_id": 3
  },
  {
    "id": 29,
    "created_at": "2025-06-28T10:07:00.529168+00:00",
    "name": "粉丝炒蛋",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVzlj-7E2cTEmnByD2m0lZcomAeKkLgOU8vw&s",
    "selection_id": 3
  },
  {
    "id": 30,
    "created_at": "2025-06-28T10:07:48.629607+00:00",
    "name": "干香茄子",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUD8y-4S2LvKmCgjen7URJAJKA7FhTaZn4kQ&s",
    "selection_id": 3
  },
  {
    "id": 28,
    "created_at": "2025-06-28T10:05:55.996056+00:00",
    "name": "虾米白菜",
    "image": "https://s4.cdn.jiaonizuocai.com/caipu/201205/2021/202147389266.jpg/NjAwX2MyXzQwMA",
    "selection_id": 3
  }
]

const selected = _.map(data, user => _.pick(user, ['name', 'selection_id', 'image']))

await db.insert(schema.users).values(selected);

await client.end()