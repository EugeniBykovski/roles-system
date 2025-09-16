"use client";

import { Namespaces } from "@/lib/i18n";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export const UsersTableSection: FC = () => {
  const { t } = useTranslation(Namespaces.app);

  return <div>{t("title")}</div>;
};
