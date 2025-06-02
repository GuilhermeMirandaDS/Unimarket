// import { useEffect, useState } from "react";
// import ProductCard, { ProductProps } from "./ProductCard";
// import { fetchUser, getAllProducts } from "@/back/api";
// import { useNavigate } from "react-router-dom";

// type UserType = {
//   id: number;
//   name: string;
//   tag: string;
//   avatar: string;
// };


// const UserProductsList = () => {
//   const [user, setUser] = useState<UserType | null>(null);
//   const [products, setProducts] = useState<ProductProps[]>([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     Promise.all([fetchUser(token), getAllProducts(token)])
//       .then(([userRes, productsRes]) => {
//         setUser(userRes);
//         if (productsRes.ok) {
//           setProducts(productsRes.data);
//         } else {
//           console.error("Erro produtos:", productsRes.error);
//         }
//       })
//       .catch((err) => {
//         console.error(err);
//         navigate("/login");
//       })
//       .finally(() => setLoading(false));
//   }, [navigate]);

//   if (loading) return <div>Carregando produtos...</div>;
//   if (!user) return <div>Usuário não autenticado</div>;

//   const filteredProducts = products.filter((p) => p.userId === user.id);

//   if (filteredProducts.length === 0) {
//     return <div>Não há produtos cadastrados por você.</div>;
//   }

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//       {filteredProducts.map((product) => (
//         <ProductCard key={product.id} {...product} />
//       ))}
//     </div>
//   );
// };

// export default UserProductsList;
