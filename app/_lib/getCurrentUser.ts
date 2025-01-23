import User from "@/models/userModel";
import dbConnect from "@/app/_lib/db";

export async function getCurrentUser(email: string) {
  await dbConnect();

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error(`Error fetching user: ${error}`);
  }
}
