import { InferSchemaType, Schema, model, CallbackError, Document } from "mongoose"
import bcrypt from "bcrypt";

const userModel = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

userModel.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
        next();
    } catch (error) {
        next(error as CallbackError);
    }
});

userModel.methods.comparePassword = async function (otherPassword: string): Promise<boolean> {
    return bcrypt.compare(otherPassword, this.password);
}

interface IUser extends Document { }
interface IUser extends InferSchemaType<typeof userModel> {
    comparePassword(otherPassword: string): Promise<boolean>;
}

const UserModel = model<IUser>("User", userModel);

export type { IUser };
export default UserModel;