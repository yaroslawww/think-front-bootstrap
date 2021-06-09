<!--
Back see in think-load-more/README.md
-->
<div class="container mx-auto relative" style="z-index: 2">
	<?php
	$moreManager = Think_WP_Load_More_Example::instance()
	?>
    <div class="flex flex-col sm:flex-row justify-between relative mb-8">
        <div class="load-more-box__total w-full pt-4 justify-end order-last sm:order-first text-example-dark font-judson text-xl md:text-2xl flex items-center sm:pt-0 sm:justify-start">
			<?= $moreManager->totalCountString() ?>
        </div>
        <div class="flex w-full sm:w-auto">
            <form action=""
                  id="search-form">
                <div class="flex space-x-2 w-full sm:w-auto">
                    <div class="relative w-full sm:w-auto">
                        <input type="text" placeholder="Search"
                               name="search"
                               class="w-full sm:w-auto bg-white h-12 pl-4 pr-10 py-2 placeholder-example-dark text-example-dark focus:outline-none outline-none"
                        >
                        <button type="submit"
                                class="absolute top-0 right-0 bg-white p-2 h-full focus:outline-none outline-none text-example hover:text-example-dark transition-all duration-500">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                 class="w-5 h-5">
                                <use href="#icon-search" class=""></use>
                            </svg>
                        </button>
                    </div>
                    <div
                            data-simple-modal-trigger="#our-example-search-filter"
                            class="select-none relative cursor-pointer flex justify-center items-center text-white h-12 px-4 py-2 bg-example-dark w-40">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                             class="pointer-events-none w-4 h-4 text-example mr-2">
                            <path fill="currentColor"
                                  d="M463.952 0H48.057C5.419 0-16.094 51.731 14.116 81.941L176 243.882V416c0 15.108 7.113 29.335 19.2 40l64 47.066c31.273 21.855 76.8 1.538 76.8-38.4V243.882L497.893 81.941C528.042 51.792 506.675 0 463.952 0zM288 224v240l-64-48V224L48 48h416L288 224z"
                                  class=""></path>
                        </svg>
                        <span class="pointer-events-none select-none">
                        Filter
                    </span>
                    </div>
                </div>
                <section
                        id="our-example-search-filter"
                        class="simple-modal py-8 md:py-16 px-4 cursor-default fixed top-0 left-0 w-full h-full overflow-x-hidden overflow-y-auto bg-example-dark bg-opacity-75">
                    <div class="simple-modal__content bg-white relative w-full max-w-2xl mx-auto h-full flex flex-col">
                        <header
                                class="p-4 md:p-6 border-b border-beige-second flex justify-center items-center relative"
                        >
                            <div
                                    class="pl-4 md:pl-6 absolute top-0 left-0 h-full flex items-center"
                            >
                                <a class="our-example-search-filter__clear cursor-pointer text-example hover:text-example-dark transition-all duration-500">
                                    Clear filters
                                </a>
                            </div>
                            <div class="text-xl md:text-2xl font-judson text-example-dark">
                                Filter
                            </div>
                            <div
                                    class="pr-4 md:pr-6 absolute top-0 right-0 h-full flex items-center"
                            >
                                <div class="cursor-pointer text-example hover:text-example-dark transition-all duration-500 block w-5 h-5">
                                    <div class="simple-modal__trigger search-menu__close-icon close-simple">
                                        <span class="pointer-events-none bg-example-dark"></span>
                                        <span class="pointer-events-none bg-example-dark"></span>
                                    </div>
                                </div>
                            </div>
                        </header>
                        <main class="flex-grow p-6 md:p-8 overflow-auto">
							<?php
							$terms = get_terms( TAX_LOCATION, [ 'hide_empty' => false, 'parent' => 0 ] );
							if ( ! empty( $terms ) ):
								?>
                                <section class="border-b border-beige-second mb-4">
                                    <header class="font-judson text-xl md:text-2xl text-example-dark mb-4">
                                        Locations
                                    </header>
                                    <div class="mb-6">
										<?php
										/** @var WP_Term $term */
										foreach ( $terms as $term ) : ?>
                                            <div class="mb-4">
                                                <label class="control control-checkbox relative">
                                                    <input
                                                            type="checkbox"
                                                            name="locations[]"
                                                            value="<?= $term->term_id ?>">
                                                    <div class="control_indicator"></div>
                                                    <span class="pl-4"><?= $term->name ?></span></label>
                                            </div>
										<?php endforeach; ?>
                                    </div>
                                </section>
							<?php endif; ?>
							<?php
							$servicesQuery = new WP_Query( [
								'post_type'      => PT_SERVICE,
								'post_status'    => 'publish',
								'posts_per_page' => - 1,
								'orderby'        => 'title',
								'order'          => 'ASC',
							] );
							if ( $servicesQuery->have_posts() ):
								?>
                                <section class="border-b-0 border-beige-second mb-4">
                                    <header class="font-judson text-xl md:text-2xl text-example-dark mb-4">
                                        Services
                                    </header>
									<?php while ( $servicesQuery->have_posts() ): $servicesQuery->the_post(); ?>
                                        <div class="mb-6">
                                            <div class="mb-4">
                                                <label class="control control-checkbox relative">
                                                    <input
                                                            type="checkbox"
                                                            name="services[]"
                                                            value="<?= get_the_ID() ?>">
                                                    <div class="control_indicator"></div>
                                                    <span class="pl-4"><?= get_the_title() ?></span></label>
                                            </div>
                                        </div>
									<?php endwhile; ?>
                                </section>
							<?php endif; ?>
                        </main>
                        <footer
                                class="p-4 md:p-6 border-t border-beige-second "
                        >
                            <button
                                    type="submit"
                                    class="outline-none focus:outline-none text-white bg-example-dark h-16 w-full flex justify-center items-center">
                                View results
                            </button>
                        </footer>
                    </div>
                </section>
            </form>
        </div>
    </div>
    <div class="load-more-box <?= ( $moreManager->totalPages() <= 1 ) ? 'load-more-box--all-showed' : '' ?>"
         data-tlmore-action="<?= $moreManager->ajaxAction() ?>"
         data-tlmore-page="<?= $moreManager->currentPage() ?>">
        <div class="load-more-box__list relative flex flex-wrap -mx-4 mb-8">
			<?= $moreManager->getItemsView() ?>
        </div>
        <div class="flex justify-center items-center mb-16"
             data-tlm-page="<?= $moreManager->currentPage() ?>"
        >
            <div
                    class="load-more-box__trigger select-none leading-none relative cursor-pointer flex justify-center items-center text-white h-12 px-4 py-2 bg-example-dark border-2 border-example-dark hover:border-example transition-all duration-500 w-40">
                Load more
            </div>
        </div>
    </div>
</div>