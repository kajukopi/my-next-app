import connectToDatabase from "@/app/lib/mongodb"
import User from "@/app/models/users"

export async function POST(request) {
  try {
    console.log(request)
    // Connect to the database
    await connectToDatabase()

    // Parse the request body
    const {name, email} = await request.json()

    // Basic validation (optional, you might want more complex validation)
    if (!name || !email) {
      return new Response(JSON.stringify({error: "Name and email are required"}), {status: 400})
    }

    // Create a new user instance
    const newUser = new User({name, email})

    // Save the user to the database
    await newUser.save()

    // Return the newly created user in the response
    return new Response(JSON.stringify(newUser), {status: 201})
  } catch (error) {
    console.error("Error creating user:", error)
    return new Response(JSON.stringify({error: "Failed to create user"}), {status: 500})
  }
}
