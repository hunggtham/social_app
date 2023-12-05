import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";
// CONFIGURATION

/* Các middleware được sử dụng ở đây là các thành phần trung gian giữa request và response trong ứng dụng Express. 
Chúng thường được sử dụng để thực hiện các chức năng như xử lý dữ liệu đầu vào, quản lý bảo mật, ghi log, và quản lý CORS. */

// Lấy đường dẫn tuyệt đối của tệp tin hiện tại (__filename)
const __filename = fileURLToPath(import.meta.url);

// Lấy tên thư mục của tệp tin hiện tại (__dirname)
const __dirname = path.dirname(__filename);

// Tải các biến môi trường từ tệp .env vào quá trình của ứng dụng
dotenv.config();

// Tạo một ứng dụng Express
const app = express();

// Sử dụng middleware express.json() để xử lý dữ liệu JSON được gửi đến máy chủ
app.use(express.json());

// Sử dụng middleware helmet() để tăng cường bảo mật bằng cách thiết lập các HTTP headers
app.use(helmet());

// Sử dụng middleware helmet.crossOriginResourcePolicy() để thiết lập chính sách nguồn tài nguyên chéo (CORS)
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// Sử dụng middleware morgan("common") để ghi log các request vào máy chủ
app.use(morgan("common"));

// Sử dụng middleware bodyParser.json() để xử lý dữ liệu JSON với cấu hình giới hạn và mở rộng
app.use(bodyParser.json({ limit: "30mb", extended: true }));

// Sử dụng middleware bodyParser.urlencoded() để xử lý dữ liệu từ các biểu mẫu web
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Sử dụng middleware cors() để xử lý Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Sử dụng middleware express.static() để phục vụ các tài nguyên tĩnh từ thư mục public/assets
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/** FILE STORAGE */

// Import thư viện multer để xử lý việc upload file
// import multer from "multer";

//  Tạo một đối tượng lưu trữ (storage) cho multer sử dụng multer.diskStorage(). Đối tượng này định nghĩa cách lưu trữ file trên đĩa.
const storage = multer.diskStorage({
  //  Thiết lập đường dẫn nơi file sẽ được lưu trữ. Ở đây, đường dẫn là "public/assets". Hàm này được gọi để xác định thư mục đích đến.
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  //  Thiết lập tên của file sau khi lưu trữ. Trong ví dụ này, sử dụng tên gốc của file (file.originalname). Hàm này được gọi để xác định tên file.
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Tạo một middleware multer sử dụng cấu hình lưu trữ đã được thiết lập (storage).
// Middleware này sẽ được sử dụng để xử lý các yêu cầu liên quan đến việc upload file trong ứng dụng của bạn.
const upload = multer({ storage });

/**ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);

//after setting port at .env
/**MONGOOSE SETUP */
// Đặt biến PORT là giá trị của biến môi trường PORT, nếu không có giá trị nào được thiết lập, sẽ sử dụng mặc định là 6001.
const PORT = process.env.PORT || 6001;
mongoose
  // ết nối đến cơ sở dữ liệu MongoDB bằng cách sử dụng mongoose. process.env.MONGO_URL là URL của cơ sở dữ liệu MongoDB được đặt trong biến môi trường.
  .connect(process.env.MONGO_URL, {
    //Các tùy chọn cấu hình cho việc kết nối đến MongoDB. useNewUrlParser giúp mongoose sử dụng URL parser mới,
    //và useUnifiedTopology sử dụng topology engine mới, giúp tránh cảnh báo từ phiên bản MongoDB mới.
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  //Nếu kết nối đến MongoDB thành công, thực hiện các công việc trong khối này.
  .then(() => {
    // Bắt đầu lắng nghe trên cổng đã đặt, và in ra thông báo khi máy chủ đã khởi động.
    app.listen(PORT, () => console.log(`Server port ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
