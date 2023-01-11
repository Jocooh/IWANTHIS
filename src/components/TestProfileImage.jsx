// import { TouchableOpacity } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import styled from "@emotion/native";

// const ProfileImage = ({ url, onChangePhoto }) => {
//   const profilePicChangeBtn = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });

//     if (!result.cancelled) {
//       onChangePhoto(result.uri);
//     }
//   };

//   return (
//     <>
//       <TouchableOpacity onPress={profilePicChangeBtn}>
//         <MyProfilePicSt source={{ uri: url }} />
//       </TouchableOpacity>
//     </>
//   );
// };

// export default ProfileImage;

// const MyProfilePicSt = styled.Image`
//   width: 200px;
//   height: 175px;

//   margin: -1% auto 5% auto;
// `;
