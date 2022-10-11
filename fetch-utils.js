const SUPABASE_URL = 'https://yptuisgakfvenupeardm.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwdHVpc2dha2Z2ZW51cGVhcmRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQyMzczNzYsImV4cCI6MTk3OTgxMzM3Nn0.3-Dci0h1LC8RHsATCxjcMG8F0wt8rBk_OWPxOn3FPK8';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */

export async function uploadImage(bucketName, imagePath, imageFile) {

    const bucket = client.storage.from(bucketName);

    const response = await bucket.upload(imagePath, imageFile, {
        cacheControl: '3600',
        upsert: true,
    });

    if (response.error) {
        return null;
    }

    const url = `${SUPABASE_URL}/storage/v1/object/public/${response.data.Key}`;
    return url;
}