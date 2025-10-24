"use client";
import { useState, FormEvent } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface UserData {
  IDnum: string;
  name: string;
  address: string;
  Degree_Course?: string;
  Year_Level: string;
  email: string;
  telephone: string;
  gender: string;
}

interface EditProfileProps {
  userData: UserData;
}

const EditProfile: React.FC<EditProfileProps> = ({ userData }) => {
  const [email, setEmail] = useState<string>(userData.email || "");
  const [telephone, setTelephone] = useState<string>(userData.telephone || "");
  const [address, setAddress] = useState<string>(userData.address || "");
  const [Degree_Course, setDegreeCourse] = useState<string>(
    userData.Degree_Course || ""
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/db/patron/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          IDnum: userData.IDnum,
          email,
          telephone,
          address,
          Degree_Course,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save changes");
      }

      const result = await response.json();
      alert(result.message || "Profile updated successfully");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("An error occurred while saving your profile.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full text-white" variant="outline">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Card>
            <CardContent className="m-2">
              <DialogDescription className="mb-2">
                **Official Information from Registrar
              </DialogDescription>
              <h1>{userData.name}</h1>
              <p>{userData.Degree_Course}</p>
              <p>{userData.IDnum}</p>
              <p>{userData.gender}</p>
            </CardContent>
          </Card>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-4 items-center gap-4 mb-2">
              <Label htmlFor="Degree_Course" className="text-right">
                Course
              </Label>
              <Input
                id="Degree_Course"
                className="col-span-3"
                value={Degree_Course}
                onChange={(e) => setDegreeCourse(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4 mb-2">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                className="col-span-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4 mb-2">
              <Label htmlFor="telephone" className="text-right">
                Phone Number
              </Label>
              <Input
                id="telephone"
                className="col-span-3"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4 mb-2">
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <Input
                id="address"
                className="col-span-3"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <DialogFooter className="w-full">
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;