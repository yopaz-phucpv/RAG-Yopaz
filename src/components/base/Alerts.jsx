import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeError } from '../../app/slices/modalSlice';

const Alerts = () => {
  const dispatch = useDispatch();
  const alerts = useSelector((state) => state.modal.errors);
  useEffect(() => {
    if (alerts.length > 0) {
      const timer = setTimeout(() => {
        dispatch(removeError());
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [alerts, dispatch]);

  if (alerts.length === 0) return null;

  return (
    <div className="fixed top-[30px] inset-x-0 z-50 flex flex-col items-center space-y-2 pointer-events-none">
      {alerts.map((alert, index) => (
        <div
          key={index}
          className={`w-1/2 p-4 rounded-lg shadow-lg border ${
            alert.status === 200
              ? 'bg-[#d1fae5] border-[#4ade80] text-[#047857]'
              : 'bg-red-100 border-red-400 text-red-700'
          } animate-slideDown pointer-events-auto`}
        >
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-md font-bold">
                {alert.status === 200 ? 'Success' : 'Error'}
              </h2>
              <p className="mt-1 text-sm">{alert.message}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Alerts;
 