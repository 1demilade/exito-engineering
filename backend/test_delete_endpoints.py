from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

ADMIN_EMAIL = "admin@exitoengineering.com"
ADMIN_PASSWORD = "ChangeThisPassword123!"

print("Logging in...")
resp = client.post("/api/auth/login", data={"username": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
print("Login status code:", resp.status_code)
print(resp.text)
if resp.status_code != 200:
    raise SystemExit("Login failed; cannot test delete endpoints")

token = resp.json().get("access_token")
headers = {"Authorization": f"Bearer {token}"}

# Create an application (no auth required)
app_data = {
    "full_name": "Test User",
    "email": "testuser@example.com",
    "phone": "1234567890",
    "specialty": "Tester",
    "experience_years": 1,
    "message": "This is a test application",
}
print("Creating application...")
resp_app = client.post("/api/applications", json=app_data)
print("Create app status:", resp_app.status_code, resp_app.text)
app_id = resp_app.json().get("id")

# Create a contact message
msg_data = {
    "name": "Contact Tester",
    "email": "contact@example.com",
    "phone": "",
    "subject": "Test message",
    "message": "Hello",
}
print("Creating contact message...")
resp_msg = client.post("/api/contact-messages", json=msg_data)
print("Create msg status:", resp_msg.status_code, resp_msg.text)
msg_id = resp_msg.json().get("id")

# Delete the application
print("Deleting application id", app_id)
resp_del_app = client.delete(f"/api/applications/{app_id}", headers=headers)
print("Delete app status:", resp_del_app.status_code, resp_del_app.text)

# Delete the contact message
print("Deleting contact message id", msg_id)
resp_del_msg = client.delete(f"/api/contact-messages/{msg_id}", headers=headers)
print("Delete msg status:", resp_del_msg.status_code, resp_del_msg.text)

print("Done")
