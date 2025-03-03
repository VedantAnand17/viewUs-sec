"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, EyeOff, Eye, Key } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteUserProfile, updateUserPassword } from "@/actions/user";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { SpinnerLoader } from "../loaders/Loader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface PasswordFormState {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  showOldPassword: boolean;
  showNewPassword: boolean;
  showConfirmPassword: boolean;
}

export const AccountSettings = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [passwordValues, setPasswordValues] = useState<PasswordFormState>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    showOldPassword: false,
    showNewPassword: false,
    showConfirmPassword: false,
  });

  const handleClickShowPassword = (field: keyof PasswordFormState) => {
    setPasswordValues((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handlePasswordChange =
    (prop: keyof PasswordFormState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordValues({
        ...passwordValues,
        [prop]: event.target.value,
      });
    };

  const handleChangePassword = async () => {
    setIsPasswordLoading(true);
    if (passwordValues.newPassword !== passwordValues.confirmPassword) {
      // toast passwords are not matching
      toast.error("New and confirm password doesn't matches");
      return;
    }

    const response = await updateUserPassword({
      id: user.id,
      old: passwordValues.oldPassword,
      newPass: passwordValues.newPassword,
    });

    if (response.status) {
      toast.success("Password updated successfully");
    } else {
      toast.error("Sorry, unable to process your changes!");
    }

    passwordValues.oldPassword = "";
    passwordValues.newPassword = "";
    passwordValues.confirmPassword = "";
    setIsPasswordLoading(false);
  };

  const handleDeleteAccount = async () => {
    setIsDeleteLoading(true);
    const response = await deleteUserProfile(user.id);
    if (response.status) {
      toast.success("Account deleted successfully");
      await signOut();
      router.push("/login");
    } else {
      //toast response.message
      toast.error("Sorry, unable to process your changes!");
    }
    setIsDeleteLoading(false);
  };

  return (
    <Card className="gap-3 w-full">
      <CardHeader>
        <CardTitle className="text-black">Account</CardTitle>
        <CardDescription>Update your account preferences.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <AlertDialog>
          <AlertDialogTrigger className="w-full" disabled={isPasswordLoading}>
            <div className="px-4 py-2 flex items-center justify-center w-full border rounded-md text-sm font-medium hover:bg-gray-100">
              {isPasswordLoading ? (
                <>
                  <SpinnerLoader size="small" className="mr-2" />
                  Loading...
                </>
              ) : (
                <>
                  <Key className="w-4 h-4 mr-2" />
                  Change Password
                </>
              )}
            </div>
          </AlertDialogTrigger>

          <AlertDialogContent className="bg-white shadow-md w-[350px] rounded md:w-full">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                You will not be able to change your password for next 2 hours,
                we will also share a mail to confirm, if you have changed the
                password, ignore that mail
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="relative">
              <Input
                placeholder="old password"
                onChange={handlePasswordChange("oldPassword")}
                type={passwordValues.showOldPassword ? "text" : "password"}
                value={passwordValues.oldPassword}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => handleClickShowPassword("showOldPassword")}
                onMouseDown={handleMouseDownPassword}
                aria-label={
                  passwordValues.showOldPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {passwordValues.showOldPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </Button>
            </div>
            <div className="relative">
              <Input
                placeholder="new password"
                onChange={handlePasswordChange("newPassword")}
                type={passwordValues.showNewPassword ? "text" : "password"}
                value={passwordValues.newPassword}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => handleClickShowPassword("showNewPassword")}
                onMouseDown={handleMouseDownPassword}
                aria-label={
                  passwordValues.showNewPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {passwordValues.showNewPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </Button>
            </div>
            <div className="relative">
              <Input
                placeholder="confirm password"
                onChange={handlePasswordChange("confirmPassword")}
                type={passwordValues.showConfirmPassword ? "text" : "password"}
                value={passwordValues.confirmPassword}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => handleClickShowPassword("showConfirmPassword")}
                onMouseDown={handleMouseDownPassword}
                aria-label={
                  passwordValues.showConfirmPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {passwordValues.showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </Button>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-red-600 hover:bg-red-600 hover:bg-opacity-90">
                <div onClick={handleChangePassword}>Change</div>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <AlertDialog>
          <AlertDialogTrigger className="w-full" disabled={isDeleteLoading}>
            <div className="h-9 px-4 py-2 flex items-center justify-center w-full shadow-md bg-red-600 hover:bg-red-600 opacity-90 hover:opacity-100 transition-all duration-300 text-white rounded-md text-sm font-medium">
              {isDeleteLoading ? (
                <>
                  <SpinnerLoader size="small" className="mr-2" />
                  Loading...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete My Account
                </>
              )}
            </div>
          </AlertDialogTrigger>

          <AlertDialogContent className="bg-white shadow-md w-[350px] rounded md:w-full">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-red-600 hover:bg-red-600 hover:bg-opacity-90">
                <div onClick={handleDeleteAccount} className="flex">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </div>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
};
