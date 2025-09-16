"use client";

import { useTranslation as useOriginalTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export const useClientTranslation = (
  ...args: Parameters<typeof useOriginalTranslation>
) => {
  const original = useOriginalTranslation(...args);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return {
    ...original,
    t: ready ? original.t : () => "",
    i18n: original.i18n,
    ready,
  };
};
