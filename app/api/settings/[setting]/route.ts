import { set, get } from "@/lib/redis";
import { unstable_noStore as noStore } from "next/cache";

type SettingsParam = { params: { setting: Settings } };

const settings = {
  interfaceType: "interfaceType",
  primaryColor: "primaryColor",
  secondaryColor: "secondaryColor",
} as const;
type Settings = keyof typeof settings;

const PREFIX = "settings" as const;

const DEFAULT_SETTINGS = {
  interfaceType: "both",
  primaryColor: "#800080",
  secondaryColor: "#ffffff",
};

function getAndValidateFlyboothId(req: Request) {
  const { searchParams } = new URL(req.url);
  const flyboothId = searchParams.get("flyboothId");

  if (!flyboothId) {
    return { error: Response.json({ error: "flyboothId is required" }) };
  }

  return { flyboothId };
}

function checkSetting(setting: Settings) {
  const settingKeys = Object.keys(settings);
  if (!settingKeys.includes(setting)) {
    return Response.json({
      error: `Invalid setting. Available settings are [${settingKeys}]`,
    });
  }
}

function getKeyPattern(setting: Settings, flyboothId: string) {
  return `${PREFIX}/${setting}/${flyboothId}`;
}

export async function POST(req: Request, { params }: SettingsParam) {
  noStore();

  const settingError = checkSetting(params.setting);
  if (settingError) return settingError;

  const { error, flyboothId } = getAndValidateFlyboothId(req);
  if (error) return error;

  const settingValue = new URL(req.url).searchParams.get("value");
  const res = await set(
    getKeyPattern(params.setting, flyboothId),
    settingValue,
    30
  );

  return Response.json(res);
}

export async function GET(req: Request, { params }: SettingsParam) {
  noStore();

  const settingError = checkSetting(params.setting);
  if (settingError) return settingError;

  const { error, flyboothId } = getAndValidateFlyboothId(req);
  if (error) return error;

  const res = await get(getKeyPattern(params.setting, flyboothId));

  if (!res) {
    return Response.json(DEFAULT_SETTINGS[params.setting]);
  }

  return Response.json(res);
}
