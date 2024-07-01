"use client";
import { Product } from "@/app/types/product";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface AppContextType {
  productSelected: Product | null;
  setProductSelected: React.Dispatch<React.SetStateAction<Product | null>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppWrapper({ children }: { children: ReactNode }) {
  const [productSelected, setProductSelected] = useState<Product | null>(null);
  return (
    <AppContext.Provider value={{ productSelected, setProductSelected }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppWrapper");
  }
  return context;
}
