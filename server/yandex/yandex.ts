import {OAuthConfig, OAuthUserConfig} from "next-auth/providers"

export interface YandexProfile {
    id: string
    login: string
    client_id: string
    display_name?: string
    real_name?: string
    first_name?: string
    default_email?: string
    emails?: string[]
    is_avatar_empty?: boolean
    default_avatar_id?: string
}

export default function Yandex(
    options: OAuthUserConfig<YandexProfile>
): OAuthConfig<YandexProfile> {
    return {
        id: "yandex",
        name: "Yandex",
        type: "oauth",
        authorization: "https://oauth.yandex.ru/authorize?scope=login:info+login:email+login:avatar",
        token: "https://oauth.yandex.ru/token",
        userinfo: "https://login.yandex.ru/info?format=json",
        profile(profile) {
            return {
                id: profile.id,
                name: profile.display_name ?? profile.real_name ?? profile.first_name,
                email: profile.default_email ?? profile.emails?.[0] ?? null,
                image:
                    !profile.is_avatar_empty && profile.default_avatar_id
                        ? `https://avatars.yandex.net/get-yapic/${profile.default_avatar_id}/islands-200`
                        : null,
            }
        },
        style: {
            logo: "/yandex-icon.png",
            bg: "#ffcc00",
            text: "#000",
        },
        clientId: options.clientId,
        clientSecret: options.clientSecret,
    }
}