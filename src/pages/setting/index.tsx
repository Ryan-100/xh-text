import React, { ReactNode } from "react";
import Icon from "../../icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers/root";

interface CardProps {
  to:string;
  children: ReactNode;
  drawer_open:boolean;
}

const Setting: React.FC = () => {
  const { drawer_open } = useSelector((state: RootState) => state.emit);
  React.useEffect(() => {
    console.log('Width of main-body element:', drawer_open);
  }, [drawer_open]);
  return (
    <div className="flex flex-col space-y-6">
      <div className="space-y-4">
        <p className="text-lg xl:text-xl">Notification Settings</p>
        <div className={`grid ${drawer_open ? 'grid-cols-2 sl:grid-cols-3 2xl:grid-cols-4 4xl:grid-cols-6 5xl:grid-cols-9':'grid-cols-3 sl:grid-cols-4 2xl:grid-cols-5 4xl:grid-cols-7 5xl:grid-cols-11'} gap-6`}>
          <Card drawer_open={drawer_open} to='notification'>
            <Icon color="#FF6604" name='noti' width={40} height={40}/>
            <p className="text-sm xl:text-base">Notification</p>
          </Card>
          <Card drawer_open={drawer_open} to='app-version'>
            <Icon color="#FF6604" name='app' width={40} height={40}/>
            <p className="text-sm xl:text-base">App Version</p>
          </Card>
          <Card drawer_open={drawer_open} to='onboarding'>
            <Icon color="#FF6604" name='ads' width={40} height={40}/>
            <p className="text-sm xl:text-base">Ads / Onboarding Photos</p>
          </Card>
        </div>
      </div>
      <div className="space-y-4">
        <p className="text-lg xl:text-xl">Parcel Settings</p>
        <div className={`grid ${drawer_open ? 'grid-cols-2 sl:grid-cols-3 2xl:grid-cols-4 4xl:grid-cols-6 5xl:grid-cols-9':'grid-cols-3 sl:grid-cols-4 2xl:grid-cols-5 4xl:grid-cols-7 5xl:grid-cols-11'} gap-6`}>
          <Card drawer_open={drawer_open} to='parcel-type'>
            <Icon color="#FF6604" name='parcel1' width={40} height={40}/>
            <p className="text-sm xl:text-base">Parcel Type</p>
          </Card>
          <Card drawer_open={drawer_open} to='weight'>
            <Icon color="#FF6604" name='weight' width={40} height={40}/>
            <p className="text-sm xl:text-base">Weight</p>
          </Card>
          <Card drawer_open={drawer_open} to='amount'>
            <Icon color="#FF6604" name='price' width={40} height={40}/>
            <p className="text-sm xl:text-base">Amount</p>
          </Card>
        </div>
      </div>
      <div className="space-y-4">
        <p className="text-lg xl:text-xl">Counter Settings</p>
        <div className={`grid ${drawer_open ? 'grid-cols-2 sl:grid-cols-3 2xl:grid-cols-4 4xl:grid-cols-6 5xl:grid-cols-9':'grid-cols-3 sl:grid-cols-4 2xl:grid-cols-5 4xl:grid-cols-7 5xl:grid-cols-11'} gap-6`}>
          <Card drawer_open={drawer_open} to='city'>
            <Icon color="#FF6604" name='city' width={40} height={40}/>
            <p className="text-sm xl:text-base">City / Branch</p>
          </Card>
          <Card drawer_open={drawer_open} to='block'>
            <Icon color="#FF6604" name='block' width={40} height={40}/>
            <p className="text-sm xl:text-base">Block</p>
          </Card>
          <Card drawer_open={drawer_open} to='region'>
            <Icon color="#FF6604" name='region' width={40} height={40}/>
            <p className="text-sm xl:text-base">Region</p>
          </Card>
          <Card drawer_open={drawer_open} to='role'>
            <Icon color="#FF6604" name='admin-role' width={40} height={40}/>
            <p className="text-sm xl:text-base">Admin Role</p>
          </Card>
          <Card drawer_open={drawer_open} to='permission'>
            <Icon color="#FF6604" name='admin-permission' width={40} height={40}/>
            <p className="text-sm xl:text-base">Admin Permission</p>
          </Card>
          <Card drawer_open={drawer_open} to='currency'>
            <Icon color="#FF6604" name='currency' width={40} height={40}/>
            <p className="text-sm xl:text-base">Currency</p>
          </Card>

          <Card drawer_open={drawer_open} to='payment-method'>
            <Icon color="#FF6604" name='payment-method' width={40} height={40}/>
            <p className="text-sm xl:text-base">Payment Method</p>
          </Card>
        </div>
      </div>
      <div className="space-y-4 pb-10">
        <p className="text-lg xl:text-xl">Counter Settings</p>
        <div className={`grid ${drawer_open ? 'grid-cols-2 sl:grid-cols-3 2xl:grid-cols-4 4xl:grid-cols-6 5xl:grid-cols-9':'grid-cols-3 sl:grid-cols-4 2xl:grid-cols-5 4xl:grid-cols-7 5xl:grid-cols-11'} gap-6`}>
          <Card drawer_open={drawer_open} to='user-guide'>
            <Icon color="#FF6604" name='user-guide' width={40} height={40}/>
            <p className="text-sm xl:text-base">User Guide</p>
          </Card>
          <Card drawer_open={drawer_open} to='help-center'>
            <Icon color="#FF6604" name='agent' width={40} height={40}/>
            <p className="text-sm xl:text-base">Help Center</p>
          </Card>
          <Card drawer_open={drawer_open} to='terms-and-policy'>
            <Icon color="#FF6604" name='terms' width={40} height={40}/>
            <p className="text-sm xl:text-base">Terms & Policy</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Setting;

export const Card: React.FC<CardProps> = ({to:link, drawer_open, children }) => {
  return (
    <Link to={link} className={`bg-white rounded-[10px] drop-shadow flex flex-col items-center justify-center space-y-4 w-[200px] ${drawer_open?'sl:w-[200px] lg:w-[320px] xl:w-[344px]':'sl:w-[210px] lg:w-[290px] xl:w-[300px]'}  h-[128px]`}>
      {children}
    </Link>
  );
};
