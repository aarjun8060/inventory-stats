import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Eye, Pencil, Trash } from "lucide-react";
  
  export const ProductTable = ({ products, isAdmin, onEdit, onDelete, onToggleStatus }: any) => (
    <div className="rounded-md border border-gray-800 bg-[#1A1C1E]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">
              <div className="w-fit px-4 py-1 bg-[#121212] rounded">
                <span className="text-[#EBCB8B]">Name</span>
              </div>
            </TableHead>
            <TableHead className="text-left">
              <div className="w-fit px-4 py-1 bg-[#121212] rounded">
                <span className="text-[#EBCB8B]">Category</span>
              </div>
            </TableHead>
            <TableHead className="text-right">
              <div className="w-fit px-4 py-1 bg-[#121212] rounded ml-auto">
                <span className="text-[#EBCB8B]">Price</span>
              </div>
            </TableHead>
            <TableHead className="text-right">
              <div className="w-fit px-4 py-1 bg-[#121212] rounded ml-auto">
                <span className="text-[#EBCB8B]">Quantity</span>
              </div>
            </TableHead>
            <TableHead className="text-right">
              <div className="w-fit px-4 py-1 bg-[#121212] rounded ml-auto">
                <span className="text-[#EBCB8B]">Value</span>
              </div>
            </TableHead>
            <TableHead className="text-right">
              <div className="w-fit px-4 py-1 bg-[#121212] rounded ml-auto">
                <span className="text-[#EBCB8B]">ACTION</span>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product: any) => (
            <TableRow 
              key={product.id}
              className={`border-b border-gray-800 hover:bg-[#252729] ${
                product.isDisabled || !isAdmin ? "opacity-50" : ""
              }`}
            >
              <TableCell className={`text-left ${isAdmin ? "text-gray-300" : "text-gray-200"}`}>{product.name}</TableCell>
              <TableCell className={`text-left ${isAdmin ? "text-gray-300" : "text-gray-200"}`}>{product.category}</TableCell>
              <TableCell className={`text-right ${isAdmin ? "text-gray-300" : "text-gray-200"}`}>{product.price}</TableCell>
              <TableCell className={`text-right ${isAdmin ? "text-gray-300" : "text-gray-200"}`}>{product.quantity}</TableCell>
              <TableCell className={`text-right ${isAdmin ? "text-gray-300" : "text-gray-200"}`}>{product.value}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => onEdit(product)}
                    disabled={!isAdmin || product.isDisabled}
                    className="p-2 hover:bg-[#2A2D2F] rounded-full disabled:opacity-50"
                  >
                    <Pencil className={`h-4 w-4 ${isAdmin ? 'text-green-500' : 'text-gray-200'}`} />
                  </button>
                  <button
                    onClick={() => onToggleStatus(product.id)}
                    disabled={!isAdmin}
                    className="p-2 hover:bg-[#2A2D2F] rounded-full disabled:opacity-50"
                  >
                    <Eye fill="true" className={`h-4 w-4 ${isAdmin ? 'text-purple-500' : 'text-gray-200'}`} />
                  </button>
                  <button
                    onClick={() => onDelete(product?.id)}
                    disabled={!isAdmin || product?.isDisabled} 
                    className="p-2 hover:bg-[#2A2D2F] rounded-full disabled:opacity-50"
                  >
                    <Trash className={`h-4 w-4 ${isAdmin ? 'text-red-500' : 'text-gray-200'}`} />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );