#include <WiFiS3.h>
#include <ArduinoHttpClient.h>
#include <Arduino_JSON.h>

// ============== USER CONFIGURATION ==============
char ssid[] = "Narasiri_2-2.4G";
char pass[] = "Narasiri002";

// <<<<< ใส่ URL ของคุณจาก Render (ไม่ต้องมี "https://")
const char serverAddress[] = "temperature-measurement-and-display.onrender.com"; 
const int serverPort = 443;
const char apiPath[] = "/api/sensorReading";

// <<<<< ใส่ API KEY เดียวกันกับบน Render
const char* apiKey = "ldfkjgkldgksjadksf_awehadasdbye";

const char* deviceId   = "MCP9700-sensor-home-01";
const char* deviceName = "MCT-Sensor";
const char* location   = "Bedroom";

const long sendingInterval = 60000; // 60 วินาที
// ===============================================

WiFiSSLClient wifiClient;
HttpClient httpClient = HttpClient(wifiClient, serverAddress, serverPort);
unsigned long lastSendTime = 0;

void setup() {
  Serial.begin(9600);
  while (!Serial);
  Serial.println("IoT Device Starting Up...");
  connectToWiFi();
}

void loop() {
  if (millis() - lastSendTime > sendingInterval) {
    lastSendTime = millis();
    int value = analogRead(A0);
    float volt = (value * 5.0) / 1023.0;
    float temperature = (volt-1) * 100 + 30 ; 
    sendDataToServer(temperature);
  }
}
void connectToWiFi() {
  Serial.println("[2] Connecting to WiFi...");
  
  if (WiFi.status() == WL_NO_MODULE) {
    Serial.println("FATAL: Communication with WiFi module failed!");
    while (true);
  }
  
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print("    > Attempting to connect to SSID: ");
    Serial.println(ssid);
    WiFi.begin(ssid, pass);
    delay(5000); // รอ 5 วินาทีแล้วลองใหม่
  }

  Serial.println("\n    > WiFi Connected!");
  Serial.print("    > IP Address: ");
  Serial.println(WiFi.localIP());
}


void sendDataToServer(float temp) {
  Serial.println("[3] Preparing and sending data...");
  
  // สร้าง JSON object
  JSONVar jsonData;
  jsonData["deviceId"] = deviceId;
  jsonData["deviceName"] = deviceName;
  jsonData["location"] = location;
  jsonData["temperature"] = temp;

  // แปลง JSON object เป็น String
  String jsonString = JSON.stringify(jsonData);
  Serial.println("    > JSON Payload: " + jsonString);

  // เริ่มส่ง HTTP POST Request
  httpClient.beginRequest();
  httpClient.post(apiPath);
  
  // เพิ่ม Headers ที่จำเป็น
  httpClient.sendHeader("Content-Type", "application/json");
  httpClient.sendHeader("api-key", apiKey); // Header สำหรับยืนยันตัวตน
  httpClient.sendHeader("Content-Length", jsonString.length());
  
  // ส่งข้อมูล JSON ใน Body
  httpClient.beginBody();
  httpClient.print(jsonString);
  httpClient.endRequest();

  // รอและอ่านการตอบกลับจาก Server
  int statusCode = httpClient.responseStatusCode();
  String responseBody = httpClient.responseBody();

  Serial.println("\n[4] Server Response:");
  Serial.print("    > HTTP Status Code: ");
  Serial.println(statusCode);
  Serial.print("    > Response Body: ");
  Serial.println(responseBody);
  Serial.println("--------------------------------");
}