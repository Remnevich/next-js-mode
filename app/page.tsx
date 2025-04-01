// export const revalidate = 5 ревалидация для продакшн билда каждые 5 секунд если есть какой то запрос
// export const dynamic = "force-dynamic" ревалидация для продакшн билда при каждом обновлении страницы

export default function Home() {
    // cookies() ревалидация для продакшн билда при каждом обновлении страницы
    return (
        <div>
            {Date.now()}
        </div>
    );
}
