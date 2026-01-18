"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { Product } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function createProduct(productData: Omit<Product, 'id' | 'created_at'>, imageBase64?: string, imageName?: string) {
    try {
        let imageUrl = productData.images[0];

        // 1. Upload Image if provided
        if (imageBase64 && imageName) {
            // Convert base64 to buffer
            const buffer = Buffer.from(imageBase64.split(',')[1], 'base64');
            const fileExt = imageName.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabaseAdmin.storage
                .from('products')
                .upload(filePath, buffer, {
                    contentType: 'image/' + fileExt,
                    upsert: true
                });

            if (uploadError) {
                console.error("Supabase Admin Storage Error:", uploadError);
                throw new Error("Image Upload Failed: " + uploadError.message);
            }

            const { data: urlData } = supabaseAdmin.storage.from('products').getPublicUrl(filePath);
            imageUrl = urlData.publicUrl;
        }

        // 2. Insert Product
        const finalProductData = {
            ...productData,
            images: imageUrl ? [imageUrl] : []
        };

        const { data, error } = await supabaseAdmin
            .from('products')
            .insert([finalProductData])
            .select()
            .single();

        if (error) {
            console.error("Supabase Admin Insert Error:", error);
            throw new Error(error.message);
        }

        revalidatePath('/admin/products');
        revalidatePath('/shop');
        return { success: true, data };
    } catch (error: any) {
        console.error("Server Action Error:", error);
        return { success: false, error: error.message };
    }
}
