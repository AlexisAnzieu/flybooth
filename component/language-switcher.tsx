import { countries } from "@/i18n";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";

polyfillCountryFlagEmojis();


export default function LanguageSwitcher({
  currentLang,
}: {
  currentLang: string;
}) {
  const pathname = usePathname();
  return (
    <Menu>
      <MenuButton
        variant="ghost"
        color={"white"}
        style={{ fontSize: 30 }}
        as={Button}
        rightIcon={<ChevronDownIcon />}
      >
        {countries.find((country) => country.code === currentLang)?.flag}
      </MenuButton>

      <MenuList>
        {countries
          .filter((c) => c.code !== currentLang)
          .map((country) => (
            <MenuItem
              as="a"
              style={{ fontSize: 20 }}
              key={country.code}
              href={pathname.replace(/\/[a-z]{2}/, `/${country.code}`)}
            >
              {country.flag} {country.name}
            </MenuItem>
          ))}
      </MenuList>
    </Menu>
  );
}
