import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'

const features = [
  {
    name: 'Spin a project',
    description:
      'Have an idea? Create a web, define the roles you\'re looking for, and share it with others in your network or school.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Build your profile',
    description: 'Highlight your skills, interests, and what you\'re looking for. Your profile helps others know where you shine and how you want to contribute to the web.',
    icon: LockClosedIcon,
  },
  {
    name: 'Connect in one click',
    description: 'Browse open projects and reach out instantly. Skip the awkward intros — project creators provide the info you need to connect directly.',
    icon: ServerIcon,
  },
]

export default function Feature() {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pt-4 lg:pr-8">
            <div className="lg:max-w-lg">
              <h2 className="text-base/7 font-semibold text-indigo-600">Find collaborators faster</h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                Your ideas deserve a strong team
              </p>
              <p className="mt-6 text-lg/8 text-gray-600">
                Cobweb makes it easy for students to find teammates for personal, academic, or hackathon projects. Spin your idea or join a web that fits your skills.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon aria-hidden="true" className="absolute top-1 left-1 size-5 text-indigo-600" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <img
            alt="Product screenshot"
            src="https://tailwindcss.com/plus-assets/img/component-images/dark-project-app-screenshot.png"
            width={2432}
            height={1442}
            className="w-3xl max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-228 md:-ml-4 lg:-ml-0"
          />
        </div>
      </div>
    </div>
  )
}
