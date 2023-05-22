import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

import Layout from "@components/layout/Layout";
import ProductForm from "@components/shared/ProductForm";

export default function EditProductPage() {
  const [productInfo, setProductInfo] = useState<any>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products?id=" + id).then((response) => {
      setProductInfo(response.data);
    });
  }, [id]);

  return (
    <Layout>
      <h1>Edit product</h1>
      {productInfo && <ProductForm {...productInfo} />}
    </Layout>
  );
}
