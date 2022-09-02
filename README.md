 # Restaurant-List 
 一個可以提供使用者搜尋、瀏覽、管理(新增、刪除)餐廳資訊的網站
 
 ## Features 
 || 產品功能

```diff    
1.瀏覽: 各式餐廳 + 各餐廳詳細資訊
2.點擊資訊頁面中的地址，可直接連結至Google Map       
3.搜尋: 依照餐廳名稱或類別進行搜尋餐廳
4.新增: 新的餐廳至清單中
5.編輯: 餐廳詳細資訊
6.刪除: 餐廳清單中不想留存的餐廳名單
+7.使用者管理帳號系統: 建立屬於自己的美食餐廳清單
```               


 
 ## Environment Setup
 || 環境建置
 - [Node.js](https://nodejs.org/en/) Setup || 環境建置
 - [express](https://www.npmjs.com/package/express)
 - [express-handlebars](https://www.npmjs.com/package/express-handlebars)
 - [body-parser](https://www.npmjs.com/package/body-parser)
 - [Mongoose](https://mongoosejs.com/docs/)

 ## Install 
 || 安裝  
 
 1.打開終端機，將此專案複製至本機
 ```
 git clone https://github.com/AlleyCC/Restaurant-List.git
 ```
 2.cd進入檔案夾中並安裝npm
 
 3.安裝其他套件: 詳閱package.json檔中的"dependencies"
 
 4.於.env.example檔中輸入你的FACEBOOK_ID以及FACEBOOK_SECRET
 
 5.匯入內建預設使用者資料
 ```
 npm run seed
 ```
 6.執行檔案
 ```
 npm run dev
 ```
 7.至瀏覽器網址欄輸入
 ```
 http://localhost:3000
 ```
