import TotalRevenue from "../../components/charts/TotalRevenue";
import TotalUser from "../../components/charts/TotalUser";
import Widget from "../../components/widget";
import { gql, useSubscription } from '@apollo/client';
import { useEndUser } from '../../machine/useEnduser';
import { useDispatch, useSelector } from "react-redux";
import { emit } from "../../store/actions";
import { useEffect } from "react";
import { RootState } from "../../store/reducers/root";
const ROOM = gql`
  subscription connectRoom($roomTopic: String!) {
    connectRoom(roomTopic: $roomTopic) {
      id
      username
      fullname
      address
      active
      is_room
      send_count
    }
  }
`;
const Dashbaord = () => {
  const { storeChatList } = useEndUser((store) => store);
  const {data,loading} = useSubscription(ROOM, {
    variables: { roomTopic: "activeroom" },
    onSubscriptionData: (data) => {
      const { connectRoom } = data.subscriptionData.data;
      storeChatList(connectRoom);
    },
  });
  // console.log(data,loading,'chat users')
const {page} = useSelector((state:RootState)=>state.emit);
console.log(page,'page')
  const dispatch = useDispatch();
  useEffect(()=>{

    dispatch(emit('PAGE_NAME_CHANGE','hello'));
  },[])
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 p-5">
        <Widget type='admin'/>
        <Widget type='order'/>
        <Widget type='earning'/>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 ">
        <TotalUser />
        <TotalRevenue />
      </div>
    </div>
  );
};

export default Dashbaord;
