import { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FaAngleDown } from "react-icons/fa";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";

export default function CheckboxRowSelectionDemo() {
  interface Product {
    id: number;
    title: string;
    place_of_origin: string;
    artist_display: string;
    inscriptions: string;
    date_start: string;
    date_end: string;
  }

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [desiredNumber, setDesiredNumber] = useState(0);
  const op = useRef<OverlayPanel>(null);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        `https://api.artic.edu/api/v1/artworks?page=${page + 1}`
      );
      const data = await response.json();
      setProducts(data.data);
      setTotalPages(data.pagination.total_pages);

      if (desiredNumber > 0 && selectedProducts.length < desiredNumber) {
        const newSelected = [...selectedProducts];
        const remaining = desiredNumber - selectedProducts.length;

        newSelected.push(...data.data.slice(0, remaining));
        setSelectedProducts(newSelected);
      }
    };

    fetchProducts();
  }, [page, desiredNumber]);

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setPage(event.page);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.querySelector(
      'input[type="number"]'
    ) as HTMLInputElement;
    const number = parseInt(input.value, 10);

    if (number > 0) {
      setDesiredNumber(number);
      setSelectedProducts([]);
      setPage(0);
    }
  };

  return (
    <div className="card">
      <DataTable
        value={products}
        selectionMode="multiple"
        selection={selectedProducts}
        onSelectionChange={(e) => {
          setSelectedProducts(e.value);
        }}
        dataKey="id"
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
          header={
            <>
              <Button
                type="button"
                style={{ padding: 2 }}
                onClick={(e) => op.current && op.current.toggle(e)}
              >
                <FaAngleDown />
              </Button>
              <OverlayPanel ref={op}>
                <form onSubmit={handleFormSubmit}>
                  <input
                    className="outline-none p-2"
                    type="number"
                    defaultValue={0}
                    min={0}
                  />
                  <button type="submit">Submit</button>
                </form>
              </OverlayPanel>
            </>
          }
        ></Column>
        <Column field="title" header="Title"></Column>
        <Column field="place_of_origin" header="Name"></Column>
        <Column field="artist_display" header="Category"></Column>
        <Column field="inscriptions" header="Quantity"></Column>
        <Column field="date_start" header="Quantity"></Column>
        <Column field="date_end" header="Quantity"></Column>
      </DataTable>
      <Paginator
        first={page}
        rows={1}
        onPageChange={onPageChange}
        totalRecords={totalPages}
        template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      />
    </div>
  );
}
