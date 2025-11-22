from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

# Auth Schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class UserCreate(BaseModel):
    email: EmailStr
    password: str

class User(BaseModel):
    id: int
    email: str
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

# Project Schemas
class ProjectBase(BaseModel):
    title: str
    description: str
    category: str
    completion_date: Optional[str] = None
    is_featured: bool = False

class ProjectCreate(ProjectBase):
    image_url: Optional[str] = None

class Project(ProjectBase):
    id: int
    image_url: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True

# Application Schemas
class ApplicationBase(BaseModel):
    full_name: str
    email: EmailStr
    phone: str
    specialty: str
    experience_years: int
    message: Optional[str] = None

class ApplicationCreate(ApplicationBase):
    cv_url: Optional[str] = None

class Application(ApplicationBase):
    id: int
    cv_url: Optional[str]
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

# Contact Schemas
class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: str
    message: str

class ContactMessage(ContactMessageCreate):
    id: int
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True