import { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { cleanProductDetail, fetchProductById } from '../../redux/actions/actions';
import s from './detail.module.css';
import { useParams } from 'react-router-dom';

// const DetailPage = ({ match, productDetails, fetchProductById }) => {
  const DetailPage = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const productDetails = useSelector((state) => state.productDetails)
  // const { id } = match.params;

  useEffect(() => {
    // Llama a la acción para obtener los detalles del producto al montar el componente
    dispatch(fetchProductById(params.id));
    return () => {dispatch(cleanProductDetail())}
  }, []);
  // }, [id, fetchProductById]);

  if (!productDetails) {
    // Puedes mostrar un indicador de carga o un mensaje de error aquí si productDetails es nulo
    return <p className={s.error}>Cargando...</p>;
  }

  // const { name, imageUrl, price, colour, description } = productDetails;

  return (
    <div className={s.productDetailsContainer}>
      <h2>{productDetails.id}</h2>
      <h1>{productDetails.name}</h1>
      <img src={`https://${productDetails.image}`} alt="product" className={s.productImage} />
      <div className={s.productInfo}>
        <p>Precio: {productDetails.price}</p>
        <p>Color: {productDetails.colour}</p>
        {/* <p>Descripción: {productDetails.description}</p> */}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  productDetails: state.productDetails,
});

const mapDispatchToProps = {
  fetchProductById,
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);
