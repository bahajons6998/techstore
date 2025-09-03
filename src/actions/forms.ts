'use server'

export async function submitForm(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  
  // Bu yerda ma'lumotlarni saqlash uchun mantiq bo'lishi mumkin
  console.log('Form ma\'lumotlari:', { name, email });
  
  // Form action void yoki Promise<void> qaytarishi kerak
}