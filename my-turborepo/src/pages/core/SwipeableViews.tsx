import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import TabsRootState from "src/interfaces/TabsRootState";
import { changeTabs } from 'src/stateSlices/tabsSlice';
import "../../navigate/SwipeableViews.css";
import { useSearchParams } from "react-router-dom";

export function SwipeableViews({
  className = "",
  onScroll,
  scroll,
  changeScroll,
  ...rootProps
}: {
} & React.HTMLProps<HTMLDivElement>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeout = useRef<number>(undefined);
  const lastChildrenCount = useRef(0);
  const tabs = useSelector((state: TabsRootState) => state.tabs.value)
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()

  // on every rerender
  useEffect(() => {
    if (!containerRef.current) return;

    // set aria-hidden and inert on all children that aren't current page
    const currentChild = containerRef.current.children[tabs];
    for (const child of Array.from(containerRef.current.children)) {
      if (!(child instanceof HTMLElement)) continue;
      child.ariaHidden = child !== currentChild ? "true" : null;
      child.inert = child !== currentChild;
    }

    // only if number of children changed
    const childrenCount = containerRef.current.children.length;
    if (childrenCount !== lastChildrenCount.current) {
      lastChildrenCount.current = childrenCount;

      // scroll container to the current page instantly
      console.log(
        "instant scroll to page",
        tabs,
        containerRef.current?.children[tabs]
      );
      const pageWidth =
        containerRef.current.scrollWidth / containerRef.current.children.length;
      containerRef.current?.scrollTo({
        behavior: "instant",
        left: tabs * pageWidth,
        top: 0,
      });
    }
  });

  // on page index change
  useEffect(() => {
    if (!containerRef.current) return;

    // scroll container to the current page smoothly
    console.log(
      "smooth scroll to page",
      tabs,
      containerRef.current.children[tabs]
    );
    const pageWidth =
      containerRef.current.scrollWidth / containerRef.current.children.length;
    containerRef.current.scrollTo({
      behavior: "smooth",
      left: tabs * pageWidth,
      top: 0,
    });
  }, [tabs]);

  // on user scroll
  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      onScroll?.(event);
      const { currentTarget } = event;
      console.log(currentTarget.scrollLeft)
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = window.setTimeout(() => {
        // update current page index
        const pageWidth =
          currentTarget.scrollWidth / currentTarget.children.length;
        const currentPage = Math.round(currentTarget.scrollLeft / pageWidth);
        if (currentPage === 0 || currentPage === 1) {
          dispatch(changeTabs(currentPage))
          setSearchParams((searchParams) => {
            searchParams.set('action', currentPage ? 'lending' : 'borrowing')
            return searchParams
          })
        }
      }, 100);
    },
  );

  return (
    <div
      {...rootProps}
      ref={containerRef}
      className={`SwipeableViews ${className}`}
      onScroll={handleScroll}
    />
  );
}
