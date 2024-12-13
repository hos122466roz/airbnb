"use client";

import { useEffect, useState } from "react";
interface ClientOnlyPorops {
  children: React.ReactNode;
}

const ClientOnly: React.FC<ClientOnlyPorops> = ({ children }) => {
  const [hasmounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasmounted) {
    return null;
  }
  return <>{children}</>;
};

export default ClientOnly;
