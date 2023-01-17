import * as St from "../styles/styled/MyPage.styled";
import ProfileArea from "../components/MyPage/ProfileArea";
import WishListArea from "../components/MyPage/WishListArea";

const MyPage = () => {
  return (
    <St.MyPageWrapper>
      <ProfileArea />
      <WishListArea />
    </St.MyPageWrapper>
  );
};

export default MyPage;
