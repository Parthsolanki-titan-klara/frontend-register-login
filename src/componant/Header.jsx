import { Link } from 'react-router-dom';

export function Header({
    heading,
    paragraph,
    linkName,
    linkUrl = "#"
}) {
    return (
        <div className="mb-10">
            <div className="flex justify-center">
                <img
                    alt=""
                    className="h-20 w-140"
                    src="https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg"
                />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                {heading}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 mt-5">
                {paragraph} {' '}
                <Link to={linkUrl} className="font-medium text-indigo-500 hover:text-indigo-500">
                    {linkName}
                </Link>
            </p>
        </div>
    )
}