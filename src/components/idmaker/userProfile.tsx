import { Separator } from "@/components/ui/separator";

interface UserData {
  IDnum: string;
  name: string;
  address: string;
  Degree_Course?: string | null;  // ✅ Allow nullable values
  Year_Level: string;
  email: string;
  telephone?: string | null;  // ✅ Handle null cases
  gender: string;
}

interface UserProfileProps {
  userData: UserData;
}

const UserProfile: React.FC<UserProfileProps> = ({ userData }) => {
  return (
    <div className="text-black">
      <h2 className="text-lg font-bold">Patron Information</h2>
      <Separator />

      <p>
        <strong>Student Number:</strong> {userData.IDnum}
      </p>
      <p>
        <strong>Name:</strong> {userData.name}
      </p>
      <p>
        <strong>Address:</strong> {userData.address}
      </p>
      <p>
        <strong>Degree Course:</strong> {userData.Degree_Course || "None"} {/* ✅ Handle null values */}
      </p>
      <p>
        <strong>Year Level:</strong> {userData.Year_Level}
      </p>
      <p>
        <strong>Email:</strong> {userData.email}
      </p>
      <p>
        <strong>Phone:</strong> {userData.telephone || "N/A"} {/* ✅ Handle null values */}
      </p>
      <p>
        <strong>Gender:</strong> {userData.gender}
      </p>
    </div>
  );
};

export default UserProfile;
