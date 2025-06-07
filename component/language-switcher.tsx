import { countries } from "@/i18n";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";

polyfillCountryFlagEmojis();


export default function LanguageSwitcher({
  currentLang,
  chevronColor = 'white',
}: {
  currentLang: string;
  chevronColor?: string;
}) {
  const pathname = usePathname();
  return (
    <Menu>
      <MenuButton
        variant="ghost"
        color="inherit"
        style={{ fontSize: 30 }}
        as={Button}
        rightIcon={<ChevronDownIcon color={chevronColor} />}
        _hover={{ bg: 'rgba(0, 0, 0, 0.05)' }}
        p={2}
        rounded="full"
      >
        {countries.find((country) => country.code === currentLang)?.flag}
      </MenuButton>

      <MenuList
        shadow="lg"
        borderRadius="xl"
        p={2}
      >
        {countries
          .filter((c) => c.code !== currentLang)
          .map((country) => (
            <MenuItem
              as="a"
              style={{ fontSize: 20 }}
              p={3}
              borderRadius="lg"
              _hover={{ bg: 'purple.50' }}
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
