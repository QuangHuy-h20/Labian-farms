import { ArrowLeft, ArrowRight } from '@assets/icons'
import {
	Swiper,
	SwiperSlide,
	SwiperOptions,
	Navigation,
	Thumbs,
} from '@components/ui/slider';
import { Image } from '@components/ui/image';
import { useRef, useState } from 'react';


interface Props {
	gallery: any[];
}

const swiperParams: SwiperOptions = {
	slidesPerView: 4,
	spaceBetween: 0,
};
export const ThumbsCarousel: React.FC<Props> = ({ gallery }) => {
	const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
	const prevRef = useRef<HTMLDivElement>(null);
	const nextRef = useRef<HTMLDivElement>(null);
	return (
		<div className="px-6 py-5 border-y border-gray-100 md:p-8 bg-white">
			<div className="relative">
				<Swiper
					id="bannerGallery"
					modules={[Navigation, Thumbs]}
					thumbs={{ swiper: thumbsSwiper }}
					navigation={{
						prevEl: prevRef.current!, // Assert non-null
						nextEl: nextRef.current!, // Assert non-null
					}}
					{...swiperParams}
				>
					{gallery?.map((item: any) => (
						<SwiperSlide
							key={`banner-gallery-${item.id}`}
							className="flex items-center justify-center selection:bg-transparent"
						>
							<Image
								src={item?.thumbnail}
								alt={`Banner gallery ${item.id}`}
								width={420}
								height={200}
							/>
						</SwiperSlide>
					))}
				</Swiper>
				<div
					ref={prevRef}
					className="product-gallery-prev cursor-pointer absolute top-2/4 left-4 md:left-1 z-10 -mt-4 md:-mt-5 w-8 h-8 md:w-9 md:h-9 rounded-full bg-white shadow-xl borderborder-opacity-70 flex items-center justify-center text-heading transition-all duration-200 hover:bg-emerald-500"
				>
					<ArrowLeft className="w-4 h-4" />
				</div>
				<div
					ref={nextRef}
					className="product-gallery-next cursor-pointer absolute top-2/4 right-4 md:right-1 z-10 -mt-4 md:-mt-5 w-8 h-8 md:w-9 md:h-9 rounded-full bg-white shadow-xl border border-opacity-70 flex items-center justify-center text-heading transition-all duration-200 hover:bg-emerald-500"
				>
					<ArrowRight className="w-4 h-4" />

				</div>
			</div>
		</div>
	);
};
