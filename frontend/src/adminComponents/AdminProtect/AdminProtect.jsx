import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { routesConfig } from '../../config/routesConfig';

function AdminProtect(props) {
    const { user } = useSelector((state) => state.userStore);
    return <>{user.role === 'admin' ? { ...props.children } : <Navigate to={routesConfig.SHOP.url} />}</>;
}

export default AdminProtect;
