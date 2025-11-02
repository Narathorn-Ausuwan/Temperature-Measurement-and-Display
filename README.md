# Physical Computing Project 2025 - IT KMITL
Tempui - Temperature Measurements and Display  
  โปรเจกต์นี้เป็นส่วนหนึ่งในรายวิชา PHYSICAL COMPUTING 06016409 ภาคเรียนที่ 1 ปีการศึกษา 2568 คณะเทคโนโลยีสารสนเทศ สาขาเทคโนโลยีสารสนเทศ สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง
  
# วัตถุประสงค์
โปรเจคนี้เป็นการนำ Arduino R4 WiFi มาเชื่อมต่อกับ Sensor MCP9700 เพื่อรับค่าอุณหภูมิ จากนั้นนำไปแสดงบนบนเว็บไซต์ Tempui ที่มีฟังก์ชันการแสดงผลข้อมูลอุณหภูมิในหน้า Dashboard และมีการพยากรณ์อากาศใน 7 วันถัดไป รวมถึงฟังก์ชันการแจ้งเตือนถึงอุณหภูมิที่เปลี่ยนแปลงไปแบบ Real-time

# ฟีเจอร์
- แสดงผลข้อมูลแบบ Dashboard และ Log
- พยากรณ์อากาศล่วงหน้า 7 วัน โดยอ้างอิงข้อมูล Open-Meteo

# ไลบรารี
- Influxdb : จัดเก็บข้อมูลที่มีเวลาเป็นแกนหลัก
- dotenv : โหลดตัวแปร Environment
- ejs : สร้างหน้า HTML แบบ Dynamic
- express : สร้าง Web Server และ API
- nodemon : อำนวยความสะดวกในการพัฒนาเซิร์ฟเวอร์

# ฮาร์ดแวร์
- Arduino UNO R4 WiFi
- MCP9700 Sensor

# การทำงาน
- Input : เซนเซอร์ MCP9700 จะวัดอุณหภูมิในสภาพแวดล้อมใกล้เคียง และส่งข้อมูลที่ได้ไป InfluxDB
- Output : มีการแสดงผลทางเว็บไซต์ในรูปแบบ Dashboard ที่แสดงข้อมูลอุณหภูมิที่วัดได้ และแสดงผลแบบ Log สำหรับผู้ใช้ที่ต้องการทราบรายละเอียดมากขึ้น โดยดึงข้อมูลมาจาก InfluxDB

# Project Website
https://temperature-measurement-and-display.onrender.com/

# Demo Video
https://www.youtube.com/watch?v=CoOb623U2RM

# Project Poster
<img width="1587" height="2245" alt="Poster PhysicalCom" src="https://github.com/user-attachments/assets/9308b84b-5b90-4420-84b2-fd1ee6b05450" />

# สมาชิก

1.) 67070242 นราธร อู่สุวรรณ์

2.) 67070264 ภัทรพล พรหมทอง

3.) 67070283 สายชล ไชยมูล
