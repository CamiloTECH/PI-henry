import Detail from "@/components/Detail";

export interface Props {
  params: { id: string };
  searchParams: {};
}

const ProductDetail: React.FC<Props> = ({ params }) => {
  return (
    <div className="px-8 py-14 bg-gray-100 flex items-center justify-center min-h-max">
      <Detail id={params.id} />
    </div>
  );
};

export default ProductDetail;
