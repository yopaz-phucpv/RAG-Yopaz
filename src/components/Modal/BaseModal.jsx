import { ReactNode, useMemo } from "react";

import { useAuthState } from "../../providers/AuthProvider";

const TOKEN_LOW_BALANCE = 5000;

export default function BaseModal({
  children, isShowTokenNotification
}) { 
  const { user_detail } = useAuthState()
  const isTokenAlmostFinish = useMemo(() => user_detail?.remain_token > TOKEN_LOW_BALANCE, [user_detail])

  return (
    <div className="overflow-y-scroll fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10 flex items-center justify-center px-3">
      {children}
    </div>
  );
}
