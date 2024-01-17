import { Project } from "~/types/project";
import Image from "next/image";
import { ExternalLink, Github, GithubIcon, Package } from "lucide-react";
import Link from "next/link";

export function ProjectItem(props: Project) {
    return (
        <div className="flex flex-row space-x-4 items-center justify-between">
            <div className="flex flex-row space-x-4 items-center">
                <div className="h-12 w-12 rounded-sm bg-neutral-800">
                    {props.iconurl && props.iconurl.length > 20 ? (
                        <Image
                            src={props.iconurl}
                            alt="project icon"
                            width={24}
                            height={24}
                            className="rounded-lg"
                        />
                    ) : (
                        <div className="flex flex-col justify-center h-full w-full">
                            <Package
                                className="text-neutral-100 mx-auto"
                                size={24}
                            />
                        </div>
                    )}
                </div>
                <div className="flex flex-col space-y-1">
                    <h3 className="text-white">{props.name}</h3>
                    <p>{props.description}</p>
                </div>
            </div>
            <div className="flex flex-row space-x-2">
                {props.giturl && (
                    <Link href={props.giturl}>
                        <GithubIcon
                            size={20}
                            className="hover:text-white transition-colors duration-150"
                        />
                    </Link>
                )}
                {props.projecturl && (
                    <Link href={props.projecturl}>
                        <ExternalLink
                            size={20}
                            className="hover:text-white transition-colors duration-150"
                        />
                    </Link>
                )}
            </div>
        </div>
    );
}
