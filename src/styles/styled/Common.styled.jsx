// 한 군데 이상 쓰는 스타일드 컴포넌트는 여기에 넣어주세요
import styled from "@emotion/native";
import { width, height } from '../../common/util';

//Loader
export const Loader = styled.View`
  width: ${width + "px"};
  height: ${height + "px"};
  justify-content: center;
  align-items: center;
`;
