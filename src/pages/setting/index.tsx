import React, { ReactNode } from "react";
import Icon from "../../icons";
import { Link } from "react-router-dom";

interface CardProps {
  to:string;
  children: ReactNode;
}

const Setting: React.FC = () => {
  return (
    <div className="flex flex-col space-y-6">
      <div className="space-y-4">
        <p className="text-xl">Notification Settings</p>
        <div className="grid grid-cols-3 gap-6">
          <Card to='notification'>
            <Icon color="#FF6604" name='noti' width={40} height={40}/>
            <p className="">Notification</p>
          </Card>
          <Card to='app-version'>
            <Icon color="#FF6604" name='app' width={40} height={40}/>
            <p className="">App Version</p>
          </Card>
          <Card to='onboarding'>
            <Icon color="#FF6604" name='ads' width={40} height={40}/>
            <p className="">Ads / Onboarding Photos</p>
          </Card>
        </div>
      </div>
      <div className="space-y-4">
        <p className="text-xl">Parcel Settings</p>
        <div className="grid grid-cols-3 gap-6">
          <Card to='parcel-type'>
            <Icon color="#FF6604" name='parcel1' width={40} height={40}/>
            <p className="">Parcel Type</p>
          </Card>
          <Card to='weight'>
            <Icon color="#FF6604" name='weight' width={40} height={40}/>
            <p className="">Weight</p>
          </Card>
          <Card to='amount'>
            <Icon color="#FF6604" name='price' width={40} height={40}/>
            <p className="">Amount</p>
          </Card>
        </div>
      </div>
      <div className="space-y-4">
        <p className="text-xl">Counter Settings</p>
        <div className="grid grid-cols-3 gap-6">
          <Card to='city'>
            <Icon color="#FF6604" name='city' width={40} height={40}/>
            <p className="">City / Branch</p>
          </Card>
          <Card to='block'>
            <Icon color="#FF6604" name='block' width={40} height={40}/>
            <p className="">Block</p>
          </Card>
          <Card to='region'>
            <Icon color="#FF6604" name='region' width={40} height={40}/>
            <p className="">Region</p>
          </Card>
          <Card to='admin-role'>
            <Icon color="#FF6604" name='admin-role' width={40} height={40}/>
            <p className="">Admin Role</p>
          </Card>
          <Card to='admin-permission'>
            <Icon color="#FF6604" name='admin-permission' width={40} height={40}/>
            <p className="">Admin Permission</p>
          </Card>
          <Card to='currency'>
            <Icon color="#FF6604" name='currency' width={40} height={40}/>
            <p className="">Currency</p>
          </Card>

          <Card to='payment-method'>
            <Icon color="#FF6604" name='payment-method' width={40} height={40}/>
            <p className="">Payment Method</p>
          </Card>
        </div>
      </div>
      <div className="space-y-4 pb-10">
        <p className="text-xl">Counter Settings</p>
        <div className="grid grid-cols-3 gap-6">
          <Card to='user-guide'>
            <Icon color="#FF6604" name='user-guide' width={40} height={40}/>
            <p className="">User Guide</p>
          </Card>
          <Card to='help-center'>
            <Icon color="#FF6604" name='agent' width={40} height={40}/>
            <p className="">Help Center</p>
          </Card>
          <Card to='terms-and-policy'>
            <Icon color="#FF6604" name='terms' width={40} height={40}/>
            <p className="">Terms & Policy</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Setting;

export const Card: React.FC<CardProps> = ({to:link, children }) => {
  return (
    <Link to={link} className="bg-white rounded-[10px] drop-shadow flex flex-col items-center justify-center space-y-4 w-[344px] h-[128px]">
      {children}
    </Link>
  );
};
